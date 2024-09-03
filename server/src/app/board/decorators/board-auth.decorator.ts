import { applyDecorators, UseGuards } from "@nestjs/common";
import { MemberRole } from "src/app/member/enums/member.enum";
import { BoardParamKey } from "./board-param-key.decorator";
import { BoardRoles } from "./board-roles.decorator";
import { BoardMemberGuard } from "../guards/board-member.guard";
import { BoardRolesGuard } from "../guards/board-roles.guard";

export const BoardAuth = (options: MemberRole[], paramKey: string = "id") => {
  return applyDecorators(
    BoardParamKey(paramKey),
    BoardRoles(options),
    UseGuards(BoardMemberGuard),
    UseGuards(BoardRolesGuard),
  );
};
