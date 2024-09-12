import { IsEnum, IsString } from "class-validator";
import { Colors } from "src/common/colors/colors.enum";

export class CreateBoardLabelDto {
  @IsString()
  name: string;

  @IsEnum(Colors)
  color: string;
}
