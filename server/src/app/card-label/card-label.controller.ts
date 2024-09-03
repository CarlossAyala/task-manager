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
import { ListValidateGuard } from "../list/guards/list-validate.guard";
import { CardValidateGuard } from "../card/guards/card-validate.guard";
import { CardLabelService } from "./card-label.service";
import { CreateCardLabelDto } from "./dto/create-card-label.dto";

@Controller()
export class CardLabelController {
  constructor(private readonly cardLabelService: CardLabelService) {}

  @Post()
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  create(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Param("cardId", ParseIntPipe) cardId: number,
    @Body() createCardLabelDto: CreateCardLabelDto,
  ) {
    return this.cardLabelService.create(boardId, cardId, createCardLabelDto);
  }

  @Get()
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findAll(@Param("cardId", ParseIntPipe) cardId: number) {
    return this.cardLabelService.findAll(cardId);
  }

  @Get(":id")
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findOne(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.cardLabelService.findOne(cardId, id);
  }

  @Delete(":id")
  @UseGuards(CardValidateGuard)
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async remove(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    await this.cardLabelService.remove(cardId, id);

    return { message: "Label removed successfully" };
  }
}
