import { ArrayUnique, MinLength } from "class-validator";

export class CreateAssigneeDto {
  @ArrayUnique<number>((members) => members, {
    message: "Members must have unique ids",
  })
  @MinLength(1, {
    each: true,
  })
  members: number[];
}
