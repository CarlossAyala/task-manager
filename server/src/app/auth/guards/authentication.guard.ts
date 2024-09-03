import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { UsersService } from "src/app/user/users.service";
import { IJWTPayload } from "../interfaces/auth.interface";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = this.extractUserIdFromRequest(request);

    if (!userId) {
      throw new UnauthorizedException("Missing sub claim in token");
    }

    try {
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      request.user = user;
    } catch (error) {
      throw error;
    }

    return true;
  }

  private extractUserIdFromRequest(
    request: Request & {
      auth: IJWTPayload;
    },
  ): number | undefined {
    const userId = request.auth.sub;

    return userId ? userId : undefined;
  }
}
