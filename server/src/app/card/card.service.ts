import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { PaginationOptions } from "src/common/pagination/pagination.interface";
import { MemberService } from "../member/member.service";
import { CardLabel } from "../card-label/entities/card-label.entity";
import { Checklist } from "../checklist/entities/checklist.entity";
import { Assignee } from "../assignee/entities/assignee.entity";
import { BoardLabelService } from "../board-label/board-label.service";
import { Card } from "./entities/card.entity";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Injectable()
export class CardService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly memberService: MemberService,
    private readonly boardLabelService: BoardLabelService,
  ) {}

  async create(
    boardId: number,
    listId: number,
    {
      assignees = [],
      labels = [],
      checklists = [],
      ...createCardDto
    }: CreateCardDto,
  ): Promise<Card> {
    await this.memberService.checkBoardMembers(boardId, assignees);

    await this.boardLabelService.checkBoardLabels(boardId, labels);

    const card = await this.dataSource.transaction(async (manager) => {
      const card = await manager.save(Card, {
        listId,
        ...createCardDto,
      });

      for (const assigneeId of assignees) {
        await manager.save(Assignee, {
          cardId: card.id,
          memberId: assigneeId,
        });
      }

      for (const labelId of labels) {
        await manager.save(CardLabel, {
          cardId: card.id,
          labelId,
        });
      }

      for (const [index, checklist] of checklists.entries()) {
        await manager.save(Checklist, {
          name: checklist.name,
          description: checklist.description,
          cardId: card.id,
          order: index,
        });
      }

      return card;
    });

    return card;
  }

  findAll(listId: number, { skip, take }: PaginationOptions): Promise<Card[]> {
    return this.cardRepository.find({
      where: { listId },
      relations: {
        assignees: true,
        labels: true,
        checklists: true,
      },
      skip,
      take,
    });
  }

  findOne(listId: number, id: number): Promise<Card | null> {
    return this.findByListIdAndId(listId, id);
  }

  async update(
    listId: number,
    id: number,
    updateCardDto: UpdateCardDto,
  ): Promise<void> {
    await this.findByListIdAndId(listId, id);

    await this.cardRepository.update(id, updateCardDto);
  }

  async remove(listId: number, id: number): Promise<void> {
    const card = await this.findByListIdAndId(listId, id);

    await this.dataSource.transaction(async (manager) => {
      const members = await manager.getRepository(Assignee).find({
        where: { cardId: id },
      });
      await manager.remove(Assignee, members);

      const labels = await manager.getRepository(CardLabel).find({
        where: { cardId: id },
      });
      await manager.remove(CardLabel, labels);

      const checklists = await manager.getRepository(Checklist).find({
        where: { cardId: id },
      });
      await manager.remove(Checklist, checklists);

      await manager.remove(Card, card);
    });
  }

  async findByListIdAndId(listId: number, id: number): Promise<Card> {
    const card = await this.cardRepository.findOneBy({
      id,
      listId,
    });
    if (!card) {
      throw new NotFoundException("Card not found");
    }

    return card;
  }

  public async hasCards(listId: number): Promise<boolean> {
    const cards = await this.cardRepository.find({
      where: { listId },
    });

    return cards.length > 0;
  }
}
