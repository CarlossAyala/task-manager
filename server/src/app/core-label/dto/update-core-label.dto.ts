import { PartialType } from "@nestjs/mapped-types";
import { CreateCoreLabelDto } from "./create-core-label.dto";

export class UpdateCoreLabelDto extends PartialType(CreateCoreLabelDto) {}
