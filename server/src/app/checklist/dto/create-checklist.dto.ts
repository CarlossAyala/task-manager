import { IsOptional, IsString } from "class-validator";

export class CreateChecklistDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
