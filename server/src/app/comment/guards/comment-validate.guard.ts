import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CommentService } from "../comment.service";

@Injectable()
export class CommentValidateGuard implements CanActivate {
  constructor(private readonly commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const cardId = request.card.id;
    const commentId = request.params.id;

    const comment = await this.commentService.findByCardIdAndId(
      cardId,
      commentId,
    );

    request.comment = comment;

    return true;
  }
}
