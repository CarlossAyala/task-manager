import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardLabelDto } from './create-board-label.dto';

export class UpdateBoardLabelDto extends PartialType(CreateBoardLabelDto) {}
