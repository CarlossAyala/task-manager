import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { BoardAuth } from "../board/decorators/board-auth.decorator";
import { MemberRole } from "../member/enums/member.enum";
import { CardValidateGuard } from "../card/guards/card-validate.guard";
import { AssigneeService } from "./assignee.service";
import { CreateAssigneeDto } from "./dto/create-assignee.dto";
import { ListValidateGuard } from "../list/guards/list-validate.guard";
// import { UpdateAssigneeDto } from "./dto/update-assignee.dto";

@Controller()
export class AssigneeController {
  constructor(private readonly assigneeService: AssigneeService) {}

  @Post()
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async create(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Param("cardId", ParseIntPipe) cardId: number,
    @Body() createAssigneeDto: CreateAssigneeDto,
  ) {
    await this.assigneeService.create(boardId, cardId, createAssigneeDto);

    return { message: "Assignees added successfully" };
  }

  @Get()
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findAll(@Param("cardId", ParseIntPipe) cardId: number) {
    return this.assigneeService.findAll(cardId);
  }

  @Get(":id")
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findOne(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.assigneeService.findOne(cardId, id);
  }

  // @Patch()
  // @UseGuards(CardValidateGuard)
  // @UseGuards(ListValidateGuard)
  // @BoardAuth([MemberRole.ProjectManager], "boardId")
  // async update(
  //   @Param("boardId", ParseIntPipe) boardId: number,
  //   @Param("cardId", ParseIntPipe) cardId: number,
  //   @Body() updateAssigneeDto: UpdateAssigneeDto,
  // ) {
  //   await this.assigneeService.update(boardId, cardId, updateAssigneeDto);

  //   return { message: "Assignee/s updated successfully" };
  // }

  @Delete(":id")
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async remove(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    await this.assigneeService.remove(cardId, id);

    return { message: "Assignee/s removed successfully" };
  }
}
