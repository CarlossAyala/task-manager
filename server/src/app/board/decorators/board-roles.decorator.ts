import { Reflector } from "@nestjs/core";
import { MemberRole } from "src/app/member/enums/member.enum";

export const BoardRoles = Reflector.createDecorator<MemberRole[]>();
