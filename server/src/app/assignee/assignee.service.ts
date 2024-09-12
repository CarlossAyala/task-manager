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
    { memberId }: CreateAssigneeDto,
  ): Promise<Assignee> {
    await this.memberService.checkBoardMember(boardId, memberId);

    const assignees = await this.findAllByCardId(cardId);
    if (assignees.find((assignee) => assignee.memberId === memberId)) {
      throw new BadRequestException("Member already assigned to this card");
    }

    return this.assigneeRepository.save({
      cardId,
      memberId,
    });
  }

  findAll(cardId: number): Promise<Assignee[]> {
    return this.assigneeRepository.findBy({
      cardId,
    });
  }

  findOne(cardId: number, id: number): Promise<Assignee> {
    return this.findByCardIdAndId(cardId, id);
  }

  async remove(cardId: number, id: number): Promise<void> {
    await this.findByCardIdAndId(cardId, id);

    await this.assigneeRepository.delete(id);
  }

  findAllByCardId(cardId: number): Promise<Assignee[]> {
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
