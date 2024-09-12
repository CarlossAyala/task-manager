import { IsInt } from "class-validator";

export class CreateAssigneeDto {
  @IsInt()
  memberId: number;
}
