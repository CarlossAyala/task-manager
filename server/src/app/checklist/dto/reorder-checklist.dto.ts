import { Type } from "class-transformer";
import { ArrayUnique, IsArray, IsInt, ValidateNested } from "class-validator";

export class ReorderChecklist {
  @IsInt()
  id: number;

  @IsInt()
  order: number;
}

export class ReorderChecklistDto {
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @ArrayUnique<ReorderChecklist>((checklists) => checklists.id, {
    message: "Checklists must have unique ids",
  })
  @ArrayUnique<ReorderChecklist>((checklists) => checklists.order, {
    message: "Checklists must have unique orders",
  })
  @Type(() => ReorderChecklist)
  checklists: ReorderChecklist[];
}
