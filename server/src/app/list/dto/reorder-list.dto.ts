import { Type } from "class-transformer";
import { IsArray, IsInt, ValidateNested } from "class-validator";

export class ReorderList {
  @IsInt()
  id: number;

  @IsInt()
  order: number;
}

export class ReorderListDto {
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => ReorderList)
  lists: ReorderList[];
}
