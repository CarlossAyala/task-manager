import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { MemberService } from "src/app/member/member.service";
import { validateEntityId } from "src/common/entities/entity.helpers";
import { BoardService } from "../board.service";
import { BoardParamKey } from "../decorators/board-param-key.decorator";

@Injectable()
export class BoardMemberGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly boardService: BoardService,
    private readonly memberService: MemberService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const paramKey = this.reflector.getAllAndOverride(BoardParamKey, [
      context.getClass(),
      context.getHandler(),
    ]);

    const request = context.switchToHttp().getRequest();

    const boardId = validateEntityId(request.params[paramKey]);
    const userId = request.user.id;

    const board = await this.boardService.findById(boardId);
    if (!board) {
      throw new NotFoundException("Board not found");
    }

    const member = await this.memberService.findByBoardIdAndUserId(
      boardId,
      userId,
    );
    if (!member) {
      throw new NotFoundException("You are not a member of this board.");
    }

    request.board = board;
    request.member = member;

    return true;
  }
}
