import { IsEnum, IsString } from "class-validator";
import { Colors } from "src/common/colors/colors.enum";

export class CreateListDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(Colors)
  color: string;
}
