import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { BaseTransaction } from "src/common/typeorm/abstracts/base-transaction.abstract";
import { MemberRole } from "src/app/member/enums/member.enum";
import { Member } from "../../member/entities/member.entity";
import { Board } from "../entities/board.entity";
import { CreateBoardDto } from "../dto/create-board.dto";

@Injectable()
export class CreateBoardTransaction extends BaseTransaction<
  {
    userId: number;
    boardDto: CreateBoardDto;
  },
  Board
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    {
      userId,
      boardDto,
    }: {
      userId: number;
      boardDto: CreateBoardDto;
    },
    manager: EntityManager,
  ): Promise<Board> {
    const board = await manager.save(Board, boardDto);

    await manager.save(Member, {
      boardId: board.id,
      userId,
      role: MemberRole.ProjectManager,
    });

    return board;
  }
}
