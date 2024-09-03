import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { MemberService } from "../member/member.service";
import { Assignee } from "./entities/assignee.entity";
import { CreateAssigneeDto } from "./dto/create-assignee.dto";
// import { UpdateAssigneeDto } from "./dto/update-assignee.dto";

@Injectable()
export class AssigneeService {
  constructor(
    @InjectRepository(Assignee)
    private readonly assigneeRepository: Repository<Assignee>,
    private readonly memberService: MemberService,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    boardId: number,
    cardId: number,
    { members }: CreateAssigneeDto,
  ): Promise<void> {
    await this.memberService.checkBoardMembers(boardId, members);

    const assignees = await this.findByCardId(cardId);
    const alreadyAssigned = assignees
      .filter((assignee) => members.includes(assignee.memberId))
      .map((assignee) => assignee.memberId);

    if (alreadyAssigned.length > 0) {
      throw new BadRequestException(
        "Member/s already assigned to this card: " + alreadyAssigned.join(", "),
      );
    }

    await this.assigneeRepository.insert(
      members.map((memberId) => ({
        cardId,
        memberId,
      })),
    );
  }

  findAll(cardId: number): Promise<Assignee[]> {
    return this.assigneeRepository.findBy({
      cardId,
    });
  }

  findOne(cardId: number, id: number): Promise<Assignee> {
    return this.findByCardIdAndId(cardId, id);
  }

  // async update(
  //   boardId: number,
  //   cardId: number,
  //   { members }: UpdateAssigneeDto,
  // ): Promise<void> {
  //   await this.memberService.checkBoardMembers(boardId, members);
  //   const assignees = await this.findByCardId(cardId);

  //   await this.dataSource.transaction(async (manager) => {
  // 		const assigneesToRemove = assignees.filter
  // 	});

  // const assigneesToRemove = assignees.filter(
  //   (assignee) => !usersIds.includes(assignee.userId),
  // );
  // await this.assigneeRepository.remove(assigneesToRemove);

  // const assigneesToAdd = usersIds.filter(
  //   (userId) => !assignees.find((assignee) => assignee.userId === userId),
  // );

  // await this.assigneeRepository.insert(
  //   assigneesToAdd.map((userId) => ({
  //     cardId,
  //     userId,
  //   })),
  // );
  // }

  async remove(cardId: number, id: number): Promise<void> {
    await this.findByCardIdAndId(cardId, id);

    await this.assigneeRepository.delete(id);
  }

  findByCardId(cardId: number): Promise<Assignee[]> {
    return this.assigneeRepository.findBy({
      cardId,
    });
  }

  async findByCardIdAndId(cardId: number, id: number): Promise<Assignee> {
    const assignee = await this.assigneeRepository.findOneBy({
      cardId,
      id,
    });
    if (!assignee) {
      throw new NotFoundException("Assignee not found");
    }

    return assignee;
  }
}
