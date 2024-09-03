import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ListService } from "../list.service";

@Injectable()
export class ListValidateGuard implements CanActivate {
  constructor(private readonly listService: ListService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const boardId = request.board.id;
    const listId = request.params.listId;

    const list = await this.listService.findByBoardIdAndId(boardId, listId);

    request.list = list;

    return true;
  }
}
