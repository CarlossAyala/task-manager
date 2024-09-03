import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Checklist } from "./entities/checklist.entity";
import { CreateChecklistDto } from "./dto/create-checklist.dto";
import { UpdateChecklistDto } from "./dto/update-checklist.dto";
import { ReorderChecklistDto } from "./dto/reorder-checklist.dto";

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(Checklist)
    private readonly checklistsRepository: Repository<Checklist>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    cardId: number,
    createChecklistDto: CreateChecklistDto,
  ): Promise<Checklist> {
    const checklists = await this.findAll(cardId);

    const order = checklists.length;

    return this.checklistsRepository.save({
      cardId,
      order,
      ...createChecklistDto,
    });
  }

  findAll(cardId: number): Promise<Checklist[]> {
    return this.checklistsRepository.find({
      where: {
        cardId,
      },
      order: {
        order: "ASC",
      },
    });
  }

  findOne(cardId: number, id: number): Promise<Checklist> {
    return this.findByCardIdAndId(cardId, id);
  }

  async reorder(
    cardId: number,
    { checklists }: ReorderChecklistDto,
  ): Promise<void> {
    const currentChecklists = await this.findAll(cardId);

    this.validateChecklists(currentChecklists, checklists);

    const checklistToUpdate = checklists.filter((c) => {
      const checklist = currentChecklists.find((cc) => cc.id === c.id);

      return checklist.order !== c.order;
    });

    if (checklistToUpdate.length > 0) {
      await this.dataSource.transaction(async (manager) => {
        for (const checklist of checklistToUpdate) {
          await manager.update(Checklist, checklist.id, {
            order: checklist.order,
          });
        }
      });
    }
  }

  async update(
    cardId: number,
    id: number,
    updateChecklistDto: UpdateChecklistDto,
  ): Promise<void> {
    await this.findByCardIdAndId(cardId, id);

    this.checklistsRepository.update(id, updateChecklistDto);
  }

  async remove(cardId: number, id: number): Promise<void> {
    await this.findByCardIdAndId(cardId, id);

    await this.checklistsRepository.delete(id);
  }

  async findByCardIdAndId(cardId: number, id: number): Promise<Checklist> {
    const checklist = await this.checklistsRepository.findOne({
      where: {
        cardId,
        id,
      },
    });
    if (!checklist) {
      throw new NotFoundException("Checklist not found");
    }

    return checklist;
  }

  validateChecklists(
    current: Checklist[],
    incoming: ReorderChecklistDto["checklists"],
  ): void {
    const notFoundChecklists = incoming
      .filter((checklist) => !current.find((c) => c.id === checklist.id))
      .map((l) => l.id);

    if (notFoundChecklists.length > 0) {
      throw new BadRequestException(
        "Checklist/s not found: " + notFoundChecklists.join(", "),
      );
    }
  }
}
