import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { BoardLabel } from "./entities/board-label.entity";
import { CreateBoardLabelDto } from "./dto/create-board-label.dto";
import { UpdateBoardLabelDto } from "./dto/update-board-label.dto";
import { CardLabel } from "../card-label/entities/card-label.entity";

@Injectable()
export class BoardLabelService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(BoardLabel)
    private readonly labelRepository: Repository<BoardLabel>,
  ) {}

  create(
    boardId: number,
    createBoardLabelDto: CreateBoardLabelDto,
  ): Promise<BoardLabel> {
    return this.labelRepository.save({
      ...createBoardLabelDto,
      boardId: boardId,
    });
  }

  findAll(boardId: number): Promise<BoardLabel[]> {
    return this.labelRepository.find({
      where: { boardId },
      order: { id: "ASC" },
    });
  }

  findOne(boardId: number, id: number): Promise<BoardLabel> {
    return this.findByBoardIdAndId(boardId, id);
  }

  async update(
    boardId: number,
    id: number,
    updateBoardLabelDto: UpdateBoardLabelDto,
  ): Promise<void> {
    await this.findByBoardIdAndId(boardId, id);

    await this.labelRepository.update(id, updateBoardLabelDto);
  }

  async remove(boardId: number, id: number): Promise<void> {
    await this.findByBoardIdAndId(boardId, id);

    await this.dataSource.transaction(async (manager) => {
      const cardLabels = await manager.find(CardLabel, {
        where: { labelId: id },
      });

      // await manager.remove(cardLabels);
      for (const cardLabel of cardLabels) {
        await manager.delete(CardLabel, cardLabel.id);
      }
      await manager.delete(BoardLabel, id);
    });
  }

  async findByBoardIdAndId(boardId: number, id: number): Promise<BoardLabel> {
    const label = await this.labelRepository.findOne({
      where: { boardId, id },
    });
    if (!label) {
      throw new NotFoundException("Label not found");
    }

    return label;
  }

  async checkBoardLabels(
    boardId: number,
    labelsIds: number[],
  ): Promise<BoardLabel[]> {
    const labels = await this.labelRepository.find({
      where: {
        boardId,
      },
    });

    const notFoundLabels = labelsIds.filter(
      (labelId) => !labels.find((l) => l.id === labelId),
    );
    if (notFoundLabels.length > 0) {
      throw new BadRequestException(
        "Label/s not found: " + notFoundLabels.join(", "),
      );
    }

    return labels;
  }
}
