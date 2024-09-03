import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { PaginationOptions } from "./pagination.interface";

export const GetPagination = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PaginationOptions => {
    const request = ctx.switchToHttp().getRequest();
    const { page, take, skip } = request.pagination;

    return {
      page,
      take,
      skip,
    };
  },
);
