import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardLabelService } from "../board-label/board-label.service";
import { CardLabel } from "./entities/card-label.entity";
import { CreateCardLabelDto } from "./dto/create-card-label.dto";

@Injectable()
export class CardLabelService {
  constructor(
    @InjectRepository(CardLabel)
    private readonly cardLabelRepository: Repository<CardLabel>,
    private readonly boardLabelService: BoardLabelService,
  ) {}

  async create(
    boardId: number,
    cardId: number,
    { labelId }: CreateCardLabelDto,
  ): Promise<CardLabel> {
    await this.boardLabelService.findByBoardIdAndId(boardId, labelId);

    const label = await this.findByLabelIdAndCardId(labelId, cardId);
    if (label) {
      throw new BadRequestException("Label already exists");
    }

    return this.cardLabelRepository.save({
      labelId,
      cardId,
    });
  }

  findAll(cardId: number): Promise<CardLabel[]> {
    return this.cardLabelRepository.find({
      where: { cardId },
      order: { id: "ASC" },
    });
  }

  findOne(cardId: number, id: number): Promise<CardLabel> {
    return this.findByCardIdAndId(cardId, id);
  }

  async remove(cardId: number, id: number): Promise<void> {
    await this.findByCardIdAndId(cardId, id);

    await this.cardLabelRepository.delete(id);
  }

  findByLabelIdAndCardId(
    labelId: number,
    cardId: number,
  ): Promise<CardLabel | undefined> {
    return this.cardLabelRepository.findOne({
      where: { labelId, cardId },
    });
  }

  async findByCardIdAndId(cardId: number, id: number): Promise<CardLabel> {
    const label = await this.cardLabelRepository.findOne({
      where: { cardId, id },
    });
    if (!label) {
      throw new NotFoundException("Label not found");
    }

    return label;
  }
}
