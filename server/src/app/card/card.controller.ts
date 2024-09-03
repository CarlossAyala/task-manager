import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { GetPagination } from "src/common/pagination/pagination.decorator";
import { PaginationOptions } from "src/common/pagination/pagination.interface";
import { BoardAuth } from "../board/decorators/board-auth.decorator";
import { MemberRole } from "../member/enums/member.enum";
import { ListValidateGuard } from "../list/guards/list-validate.guard";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Card } from "./entities/card.entity";
import { CardService } from "./card.service";

@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  create(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Param("listId", ParseIntPipe) listId: number,
    @Body() createCardDto: CreateCardDto,
  ): Promise<Card> {
    return this.cardService.create(boardId, listId, createCardDto);
  }

  @Get()
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findAll(
    @Param("listId", ParseIntPipe) listId: number,
    @GetPagination() pagination: PaginationOptions,
  ): Promise<Card[]> {
    return this.cardService.findAll(listId, pagination);
  }

  @Get(":id")
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findOne(
    @Param("listId", ParseIntPipe) listId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.cardService.findOne(listId, id);
  }

  // TODO: Implement reorder cards

  @Patch(":id")
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async update(
    @Param("listId", ParseIntPipe) listId: number,
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    await this.cardService.update(listId, id, updateCardDto);

    return { message: "Card updated successfully" };
  }

  @Delete(":id")
  @UseGuards(ListValidateGuard)
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async remove(
    @Param("listId", ParseIntPipe) listId: number,
    @Param("id", ParseIntPipe) id: number,
  ) {
    await this.cardService.remove(listId, id);

    return { message: "Card removed successfully" };
  }
}
