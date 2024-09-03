import { PartialType } from "@nestjs/mapped-types";
import { CreateChecklistDto } from "./create-checklist.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateChecklistDto extends PartialType(CreateChecklistDto) {
  @IsBoolean()
  @IsOptional()
  isChecked: boolean;
}
