import { PickType } from "@nestjs/mapped-types";
import { CreateCardDto } from "./create-card.dto";

export class UpdateCardDto extends PickType(CreateCardDto, [
  "title",
  "description",
  "dueDate",
  "reminderDate",
] as const) {}
