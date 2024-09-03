import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CommentService } from "../comment.service";
import { MemberRole } from "src/app/member/enums/member.enum";

@Injectable()
export class CommentAccessGuard implements CanActivate {
  constructor(private readonly commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const member = request.member;
    const comment = request.comment;

    const isOwner = comment.userId === member.userId;
    const isAdmin = member.role === MemberRole.ProjectManager;

    return isOwner || isAdmin;
  }
}
