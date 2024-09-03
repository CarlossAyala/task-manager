import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "../board/board.module";
import { MemberModule } from "../member/member.module";
import { BoardLabel } from "./entities/board-label.entity";
import { BoardLabelService } from "./board-label.service";
import { BoardLabelController } from "./board-label.controller";

@Module({
  imports: [TypeOrmModule.forFeature([BoardLabel]), BoardModule, MemberModule],
  controllers: [BoardLabelController],
  providers: [BoardLabelService],
  exports: [BoardLabelService],
})
export class BoardLabelModule {}
