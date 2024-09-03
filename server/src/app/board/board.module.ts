import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemberModule } from "../member/member.module";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { Board } from "./entities/board.entity";
import { CreateBoardTransaction } from "./transactions/create-board.transaction";
import { RemoveBoardTransaction } from "./transactions/remove-board.transaction";

@Module({
  imports: [TypeOrmModule.forFeature([Board]), forwardRef(() => MemberModule)],
  controllers: [BoardController],
  providers: [BoardService, CreateBoardTransaction, RemoveBoardTransaction],
  exports: [BoardService],
})
export class BoardModule {}
