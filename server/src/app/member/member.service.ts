import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../user/users.service";
import { Member } from "./entities/member.entity";
import { CreateMemberDto } from "./dto/create-member.dto";
import { UpdateMemberDto } from "./dto/update-member.dto";
import { MemberRole } from "./enums/member.enum";

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly userService: UsersService,
  ) {}

  async create(
    boardId: number,
    { userId, role }: CreateMemberDto,
  ): Promise<Member> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new BadRequestException("User not found");
    }

    const member = await this.findByBoardIdAndUserId(boardId, userId);
    if (member) {
      throw new BadRequestException("Member already exists in this board");
    }

    return this.memberRepository.save({
      boardId,
      userId,
      role,
    });
  }

  findAll(boardId: number): Promise<Member[]> {
    return this.memberRepository.find({
      relations: {
        user: true,
      },
      where: { boardId },
    });
  }

  async update(
    boardId: number,
    memberId: number,
    { role }: UpdateMemberDto,
  ): Promise<void> {
    const member = await this.findByBoardIdAndId(boardId, memberId);
    if (!member) {
      throw new BadRequestException("Member not found");
    }

    if (member.role === role) {
      throw new BadRequestException("Member already has this role");
    }

    await this.checkProjectManagers(boardId, member);

    await this.memberRepository.update(memberId, {
      role,
    });
  }

  async remove(boardId: number, memberId: number): Promise<void> {
    const member = await this.findByBoardIdAndId(boardId, memberId);
    if (!member) {
      throw new BadRequestException("Member not found");
    }

    await this.checkProjectManagers(boardId, member);

    await this.memberRepository.delete(memberId);
  }

  findByBoardIdAndId(boardId: number, id: number): Promise<Member | null> {
    return this.memberRepository.findOneBy({
      id,
      boardId,
    });
  }

  findByBoardIdAndUserId(
    boardId: number,
    userId: number,
  ): Promise<Member | null> {
    return this.memberRepository.findOneBy({
      boardId,
      userId,
    });
  }

  async checkProjectManagers(boardId: number, member: Member): Promise<void> {
    if (member.role === MemberRole.ProjectManager) {
      const members = await this.memberRepository.find({
        where: {
          boardId,
          role: MemberRole.ProjectManager,
        },
      });

      if (members.length === 1) {
        throw new BadRequestException(
          "You can't remove the last Project Manager",
        );
      }
    }
  }

  async checkBoardMembers(
    boardId: number,
    membersIds: number[],
  ): Promise<Member[]> {
    const members = await this.memberRepository.find({
      where: {
        boardId,
      },
    });

    const notFoundMembers = membersIds.filter(
      (memberId) => !members.find((m) => m.id === memberId),
    );
    if (notFoundMembers.length > 0) {
      throw new BadRequestException(
        "Member/s not found: " + notFoundMembers.join(", "),
      );
    }

    return members;
  }
}
