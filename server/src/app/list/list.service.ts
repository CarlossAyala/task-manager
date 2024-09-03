import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { List } from "./entities/list.entity";
import { ReorderListDto } from "./dto/reorder-list.dto";
import { CardService } from "../card/card.service";

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    private readonly dataSource: DataSource,
    private readonly cardService: CardService,
  ) {}

  async create(
    boardId: number,
    { name, description, color }: CreateListDto,
  ): Promise<List> {
    const lists = await this.findAll(boardId);

    const listExist = lists.some(
      (list) => list.name.toLowerCase() === name.toLowerCase(),
    );

    if (listExist) {
      throw new BadRequestException("List already exists");
    }

    const order = lists.length;

    const list = await this.listRepository.save({
      boardId,
      name,
      description,
      order,
      color,
    });

    return list;
  }

  findAll(boardId: number): Promise<List[]> {
    return this.listRepository.find({
      where: { boardId },
      order: { order: "ASC" },
    });
  }

  findOne(boardId: number, id: number): Promise<List> {
    return this.findByBoardIdAndId(boardId, id);
  }

  async reorder(boardId: number, { lists }: ReorderListDto): Promise<void> {
    const currentLists = await this.findAll(boardId);

    await this.validateLists(currentLists, lists);
    this.checkListsOrder(lists);

    const listToUpdate = lists.filter((l) => {
      const list = currentLists.find((c) => c.id === l.id);

      return list.order !== l.order;
    });

    if (listToUpdate.length > 0) {
      await this.dataSource.transaction(async (manager) => {
        for (const list of listToUpdate) {
          await manager.update(List, list.id, {
            order: list.order,
          });
        }
      });
    }
  }

  async update(
    boardId: number,
    id: number,
    listDto: UpdateListDto,
  ): Promise<void> {
    await this.findByBoardIdAndId(boardId, id);

    await this.listRepository.update(id, listDto);
  }

  async remove(boardId: number, id: number): Promise<void> {
    await this.findByBoardIdAndId(boardId, id);

    const hasCards = await this.cardService.hasCards(id);
    if (hasCards) {
      throw new BadRequestException(
        "List can't be deleted because it has cards",
      );
    }

    await this.listRepository.delete(id);
  }

  async findByBoardIdAndId(boardId: number, id: number): Promise<List> {
    const list = await this.listRepository.findOneBy({ id, boardId });

    if (!list) {
      throw new NotFoundException("List not found");
    }

    return list;
  }

  async validateLists(
    current: List[],
    incoming: ReorderListDto["lists"],
  ): Promise<void> {
    const notFoundLists = incoming
      .filter((list) => !current.find((c) => c.id === list.id))
      .map((l) => l.id);

    if (notFoundLists.length > 0) {
      throw new BadRequestException(
        "List/s not found: " + notFoundLists.join(", "),
      );
    }
  }

  checkListsOrder(lists: ReorderListDto["lists"]): void {
    const orderSet = new Set<number>();
    const duplicatedOrderSet = new Set<number>();

    for (const list of lists) {
      if (orderSet.has(list.order)) {
        duplicatedOrderSet.add(list.order);
        continue;
      }
      orderSet.add(list.order);
    }

    if (duplicatedOrderSet.size > 0) {
      throw new BadRequestException(
        "Order values must be unique. Duplicated order values: " +
          [...duplicatedOrderSet].join(", "),
      );
    }
  }
}
