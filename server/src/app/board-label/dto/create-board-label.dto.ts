import { IsEnum, IsOptional, IsString } from "class-validator";
import { Colors } from "src/common/colors/colors.enum";

export class CreateBoardLabelDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(Colors)
  color: string;
}
