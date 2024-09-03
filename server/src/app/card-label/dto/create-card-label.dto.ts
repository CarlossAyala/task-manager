import { IsInt } from "class-validator";

export class CreateCardLabelDto {
  @IsInt()
  labelId: number;
}
