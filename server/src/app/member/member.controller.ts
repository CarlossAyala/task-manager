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
import { BoardAuth } from "../board/decorators/board-auth.decorator";
import { MemberService } from "./member.service";
import { MemberRole } from "./enums/member.enum";
import { CreateMemberDto } from "./dto/create-member.dto";
import { UpdateMemberDto } from "./dto/update-member.dto";

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async create(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    await this.memberService.create(boardId, createMemberDto);

    return { message: "Member added successfully" };
  }

  @Get()
  @BoardAuth([MemberRole.ProjectManager, MemberRole.Member], "boardId")
  findAll(@Param("boardId", ParseIntPipe) boardId: number) {
    return this.memberService.findAll(boardId);
  }

  @Patch(":id")
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async update(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Param("id", ParseIntPipe) memberId: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    await this.memberService.update(boardId, memberId, updateMemberDto);

    return { message: "Member updated successfully" };
  }

  @Delete(":id")
  @BoardAuth([MemberRole.ProjectManager], "boardId")
  async remove(
    @Param("boardId", ParseIntPipe) boardId: number,
    @Param("id", ParseIntPipe) memberId: number,
  ) {
    await this.memberService.remove(boardId, memberId);

    return { message: "Member removed successfully" };
  }
}
