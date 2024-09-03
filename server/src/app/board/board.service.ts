import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaginationOptions } from "src/common/pagination/pagination.interface";
import { Board } from "./entities/board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { CreateBoardTransaction } from "./transactions/create-board.transaction";
import { RemoveBoardTransaction } from "./transactions/remove-board.transaction";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly createBoardTransaction: CreateBoardTransaction,
    private readonly removeBoardTransaction: RemoveBoardTransaction,
  ) {}

  create(userId: number, boardDto: CreateBoardDto): Promise<Board> {
    return this.createBoardTransaction.run({
      userId,
      boardDto,
    });
  }

  findAll(userId: number, pagination: PaginationOptions): Promise<Board[]> {
    const { skip, take } = pagination;

    return this.boardRepository.find({
      where: {
        members: {
          userId,
        },
      },
      skip,
      take,
    });
  }

  findOne(boardId: number, userId: number): Promise<Board | null> {
    return this.boardRepository.findOne({
      where: {
        id: boardId,
        members: {
          userId,
        },
      },
    });
  }

  async update(id: number, boardDto: UpdateBoardDto): Promise<void> {
    const board = await this.findById(id);
    if (!board) {
      throw new NotFoundException("Board not found");
    }

    await this.boardRepository.update(id, boardDto);
  }

  async remove(boardId: number): Promise<void> {
    await this.removeBoardTransaction.run(boardId);
  }

  findById(id: number): Promise<Board | null> {
    return this.boardRepository.findOneBy({ id });
  }
}
