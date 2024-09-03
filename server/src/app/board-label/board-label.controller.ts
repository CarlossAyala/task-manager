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
import { BoardLabelService } from "./board-label.service";
import { CreateBoardLabelDto } from "./dto/create-board-label.dto";
import { UpdateBoardLabelDto } from "./dto/update-board-label.dto";
import { BoardAuth } from "../board/decorators/board-auth.decorator";
import { MemberRole } from "../member/enums/member.enum";

@Controller()
export class BoardLabelController {
  constructor(private readonly boardLabelService: BoardLabelService) {}

  @Post()
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  create(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Body() createBoardLabelDto: CreateBoardLabelDto,
  ) {
    return this.boardLabelService.create(boardId, createBoardLabelDto);
  }

  @Get()
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findAll(@Param("boardId", ParseIntPipe) boardId: number) {
    return this.boardLabelService.findAll(boardId);
  }

  @Get(":id")
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findOne(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.boardLabelService.findOne(boardId, id);
  }

  @Patch(":id")
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async update(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBoardLabelDto: UpdateBoardLabelDto,
  ) {
    await this.boardLabelService.update(boardId, id, updateBoardLabelDto);

    return { message: "Label updated successfully" };
  }

  @Delete(":id")
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async remove(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    await this.boardLabelService.remove(boardId, id);

    return { message: "Label removed successfully" };
  }
}
