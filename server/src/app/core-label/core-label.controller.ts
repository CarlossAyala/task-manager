import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CoreLabelService } from "./core-label.service";
import { CreateCoreLabelDto } from "./dto/create-core-label.dto";
import { UpdateCoreLabelDto } from "./dto/update-core-label.dto";

@Controller()
export class CoreLabelController {
  constructor(private readonly coreLabelService: CoreLabelService) {}

  @Post()
  create(@Body() createCoreLabelDto: CreateCoreLabelDto) {
    return this.coreLabelService.create(createCoreLabelDto);
  }

  @Get()
  findAll() {
    return this.coreLabelService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coreLabelService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCoreLabelDto: UpdateCoreLabelDto,
  ) {
    return this.coreLabelService.update(+id, updateCoreLabelDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coreLabelService.remove(+id);
  }
}
