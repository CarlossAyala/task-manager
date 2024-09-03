import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { GetPagination } from "src/common/pagination/pagination.decorator";
import { PaginationOptions } from "src/common/pagination/pagination.interface";
import { ListValidateGuard } from "../list/guards/list-validate.guard";
import { CardValidateGuard } from "../card/guards/card-validate.guard";
import { BoardAuth } from "../board/decorators/board-auth.decorator";
import { MemberRole } from "../member/enums/member.enum";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentAuthorGuard } from "./guards/comment-author.guard";
import { CommentValidateGuard } from "./guards/comment-validate.guard";
import { CommentAccessGuard } from "./guards/comment-access.guard";

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  create(
    @GetUser("id") userId: number,
    @Param("cardId", ParseIntPipe) cardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(userId, cardId, createCommentDto);
  }

  @Get()
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findAll(
    @Param("cardId", ParseIntPipe) cardId: number,
    @GetPagination() pagination: PaginationOptions,
  ) {
    return this.commentService.findAll(cardId, pagination);
  }

  @Get(":id")
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findOne(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.commentService.findOne(cardId, id);
  }

  @Patch(":id")
  @UseGuards(CommentAuthorGuard)
  @UseGuards(CommentValidateGuard)
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    await this.commentService.update(id, updateCommentDto);

    return { message: "Comment updated successfully" };
  }

  @Delete(":id")
  @UseGuards(CommentAccessGuard)
  @UseGuards(CommentValidateGuard)
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.commentService.remove(id);

    return { message: "Comment removed successfully" };
  }
}
