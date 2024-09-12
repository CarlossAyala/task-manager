import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { BoardAuth } from "../board/decorators/board-auth.decorator";
import { MemberRole } from "../member/enums/member.enum";
import { CardValidateGuard } from "../card/guards/card-validate.guard";
import { ListValidateGuard } from "../list/guards/list-validate.guard";
import { AssigneeService } from "./assignee.service";
import { CreateAssigneeDto } from "./dto/create-assignee.dto";

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
    return this.assigneeService.create(boardId, cardId, createAssigneeDto);
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

  @Delete(":id")
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async remove(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    await this.assigneeService.remove(cardId, id);

    return { message: "Assignee removed successfully" };
  }
}
