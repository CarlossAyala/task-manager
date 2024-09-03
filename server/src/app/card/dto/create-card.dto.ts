import { Type } from "class-transformer";
import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

class Checklist {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class CreateCardDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayUnique<number>((members) => members, {
    message: "Some members ids are duplicated",
  })
  @IsOptional()
  assignees: number[];

  @IsArray()
  @ArrayUnique<number>((labels) => labels, {
    message: "Some labels ids are duplicated",
  })
  @IsOptional()
  labels: number[];

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @IsOptional()
  @Type(() => Checklist)
  checklists?: Checklist[];

  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @IsDateString()
  @IsOptional()
  reminderDate: Date;
}
