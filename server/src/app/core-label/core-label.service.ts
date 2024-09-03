import { Injectable } from '@nestjs/common';
import { CreateCoreLabelDto } from './dto/create-core-label.dto';
import { UpdateCoreLabelDto } from './dto/update-core-label.dto';

@Injectable()
export class CoreLabelService {
  create(createCoreLabelDto: CreateCoreLabelDto) {
    return 'This action adds a new coreLabel';
  }

  findAll() {
    return `This action returns all coreLabel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coreLabel`;
  }

  update(id: number, updateCoreLabelDto: UpdateCoreLabelDto) {
    return `This action updates a #${id} coreLabel`;
  }

  remove(id: number) {
    return `This action removes a #${id} coreLabel`;
  }
}
