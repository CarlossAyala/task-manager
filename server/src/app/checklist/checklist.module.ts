import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChecklistService } from "./checklist.service";
import { ChecklistController } from "./checklist.controller";
import { Checklist } from "./entities/checklist.entity";
import { BoardModule } from "../board/board.module";
import { MemberModule } from "../member/member.module";
import { ListModule } from "../list/list.module";
import { CardModule } from "../card/card.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Checklist]),
    BoardModule,
    MemberModule,
    ListModule,
    CardModule,
  ],
  controllers: [ChecklistController],
  providers: [ChecklistService],
  exports: [ChecklistService],
})
export class ChecklistModule {}
