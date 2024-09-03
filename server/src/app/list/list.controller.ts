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
import { ListService } from "./list.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { BoardAuth } from "../board/decorators/board-auth.decorator";
import { MemberRole } from "../member/enums/member.enum";
import { ReorderListDto } from "./dto/reorder-list.dto";

@Controller()
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  create(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Body() createListDto: CreateListDto,
  ) {
    return this.listService.create(boardId, createListDto);
  }

  @Get()
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findAll(@Param("boardId", ParseIntPipe) boardId: number) {
    return this.listService.findAll(boardId);
  }

  @Get(":id")
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findOne(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.listService.findOne(boardId, id);
  }

  @Patch("reorder")
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async reorder(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Body() listsDto: ReorderListDto,
  ) {
    await this.listService.reorder(boardId, listsDto);

    return { message: "List reordered successfully" };
  }

  @Patch(":id")
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async update(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Param("id", ParseIntPipe) id: number,
    @Body() updateListDto: UpdateListDto,
  ) {
    await this.listService.update(boardId, id, updateListDto);

    return { message: "List updated successfully" };
  }

  @Delete(":id")
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async remove(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    await this.listService.remove(boardId, id);

    return { message: "List removed successfully" };
  }
}
