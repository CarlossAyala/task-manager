import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "../board/board.module";
import { MemberModule } from "../member/member.module";
import { ListModule } from "../list/list.module";
import { CardModule } from "../card/card.module";
import { BoardLabelModule } from "../board-label/board-label.module";
import { CardLabel } from "./entities/card-label.entity";
import { CardLabelService } from "./card-label.service";
import { CardLabelController } from "./card-label.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([CardLabel]),
    BoardModule,
    MemberModule,
    ListModule,
    CardModule,
    BoardLabelModule,
  ],
  controllers: [CardLabelController],
  providers: [CardLabelService],
  exports: [CardLabelService],
})
export class CardLabelModule {}
