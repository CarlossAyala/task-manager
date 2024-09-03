import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CommentService } from "../comment.service";

@Injectable()
export class CommentAuthorGuard implements CanActivate {
  constructor(private readonly commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const comment = request.comment;

    return comment.userId === request.user.id;
  }
}
