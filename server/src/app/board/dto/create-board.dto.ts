import { IsDateString, IsString, Length } from "class-validator";

export class CreateBoardDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsString()
  @Length(2, 255)
  description: string;

  @IsDateString()
  dueDate: Date;
}
