import { IsEnum, IsOptional, IsString } from "class-validator";
import { Colors } from "src/common/colors/colors.enum";

export class CreateCoreLabelDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(Colors)
  color: string;
}
