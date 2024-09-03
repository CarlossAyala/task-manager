import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "../board/board.module";
import { MemberModule } from "../member/member.module";
import { BoardLabelModule } from "../board-label/board-label.module";
import { Card } from "./entities/card.entity";
import { ListModule } from "../list/list.module";
import { CardController } from "./card.controller";
import { CardService } from "./card.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    BoardModule,
    MemberModule,
    forwardRef(() => ListModule),
    BoardLabelModule,
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
