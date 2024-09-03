import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { List } from "./entities/list.entity";
import { ListService } from "./list.service";
import { ListController } from "./list.controller";
import { BoardModule } from "../board/board.module";
import { MemberModule } from "../member/member.module";
import { CardModule } from "../card/card.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    MemberModule,
    BoardModule,
    forwardRef(() => CardModule),
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
