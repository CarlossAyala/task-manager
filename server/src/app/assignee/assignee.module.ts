import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assignee } from "./entities/assignee.entity";
import { AssigneeService } from "./assignee.service";
import { AssigneeController } from "./assignee.controller";
import { BoardModule } from "../board/board.module";
import { CardModule } from "../card/card.module";
import { MemberModule } from "../member/member.module";
import { ListModule } from "../list/list.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignee]),
    BoardModule,
    ListModule,
    CardModule,
    MemberModule,
  ],
  controllers: [AssigneeController],
  providers: [AssigneeService],
  exports: [AssigneeService],
})
export class AssigneeModule {}
