import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AppCookies } from "./cookies.interface";

export const GetCookies = createParamDecorator(
  (data: keyof AppCookies | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const cookies = request.cookies;

    return data ? cookies[data] : cookies;
  },
);
