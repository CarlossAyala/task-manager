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
import { BoardAuth } from "../board/decorators/board-auth.decorator";
import { MemberRole } from "../member/enums/member.enum";
import { ListValidateGuard } from "../list/guards/list-validate.guard";
import { CardValidateGuard } from "../card/guards/card-validate.guard";
import { ChecklistService } from "./checklist.service";
import { CreateChecklistDto } from "./dto/create-checklist.dto";
import { UpdateChecklistDto } from "./dto/update-checklist.dto";
import { ReorderChecklistDto } from "./dto/reorder-checklist.dto";

@Controller()
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Post()
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  create(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Body() createChecklistDto: CreateChecklistDto,
  ) {
    return this.checklistService.create(cardId, createChecklistDto);
  }

  @Get()
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findAll(@Param("cardId", ParseIntPipe) cardId: number) {
    return this.checklistService.findAll(cardId);
  }

  @Get(":id")
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findOne(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.checklistService.findOne(cardId, id);
  }

  @Patch("reorder")
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async reorder(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Body() checklistsDto: ReorderChecklistDto,
  ) {
    await this.checklistService.reorder(cardId, checklistsDto);

    return { message: "Checklists reordered successfully" };
  }

  @Patch(":id")
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async update(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Param("id", ParseIntPipe) id: number,
    @Body() updateChecklistDto: UpdateChecklistDto,
  ) {
    await this.checklistService.update(cardId, id, updateChecklistDto);

    return { message: "Checklist updated successfully" };
  }

  @Delete(":id")
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async remove(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    await this.checklistService.remove(cardId, id);

    return { message: "Checklist removed successfully" };
  }
}
