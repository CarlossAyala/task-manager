import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { GetPagination } from "src/common/pagination/pagination.decorator";
import { PaginationOptions } from "src/common/pagination/pagination.interface";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { MemberRole } from "../member/enums/member.enum";
import { BoardAuth } from "./decorators/board-auth.decorator";
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(
    @GetUser("id") userId: number,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    return this.boardService.create(userId, createBoardDto);
  }

  @Get()
  findAll(
    @GetUser("id") userId: number,
    @GetPagination() pagination: PaginationOptions,
  ) {
    return this.boardService.findAll(userId, pagination);
  }

  @Get(":id")
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member])
  findOne(
    @Param("id", ParseIntPipe) boardId: number,
    @GetUser("id") userId: number,
  ) {
    return this.boardService.findOne(boardId, userId);
  }

  @Patch(":id")
  @BoardAuth([MemberRole.ProjectManager])
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() boardDto: UpdateBoardDto,
  ) {
    await this.boardService.update(id, boardDto);

    return { message: "Board updated successfully" };
  }

  @Delete(":id")
  @BoardAuth([MemberRole.ProjectManager])
  async remove(@Param("id", ParseIntPipe) boardId: number) {
    await this.boardService.remove(boardId);

    return { message: "Board removed successfully" };
  }
}
