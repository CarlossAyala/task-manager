import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { BoardRoles } from "../decorators/board-roles.decorator";

@Injectable()
export class BoardRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride(BoardRoles, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!roles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const member = request.member;

    return roles.includes(member.role);
  }
}
