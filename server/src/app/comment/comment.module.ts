import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { BoardModule } from "../board/board.module";
import { MemberModule } from "../member/member.module";
import { CardModule } from "../card/card.module";
import { ListModule } from "../list/list.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    BoardModule,
    MemberModule,
    ListModule,
    CardModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
