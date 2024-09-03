import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { BaseTransaction } from "src/common/typeorm/abstracts/base-transaction.abstract";
import { Board } from "../entities/board.entity";
import { Member } from "../../member/entities/member.entity";

@Injectable()
export class RemoveBoardTransaction extends BaseTransaction<number, void> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    boardId: number,
    manager: EntityManager,
  ): Promise<void> {
    await manager.delete(Member, {
      boardId,
    });

    await manager.delete(Board, {
      id: boardId,
    });
  }
}
