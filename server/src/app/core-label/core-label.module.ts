import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoreLabel } from "./entities/core-label.entity";
import { CoreLabelService } from "./core-label.service";
// import { CoreLabelController } from "./core-label.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CoreLabel])],
  // controllers: [CoreLabelController],
  providers: [CoreLabelService],
  exports: [CoreLabelService],
})
export class CoreLabelModule {}
