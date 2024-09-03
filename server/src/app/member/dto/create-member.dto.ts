import { IsEnum, IsInt } from "class-validator";
import { MemberRole } from "../enums/member.enum";

export class CreateMemberDto {
  @IsInt()
  userId: number;

  @IsEnum(MemberRole)
  role: MemberRole;
}
