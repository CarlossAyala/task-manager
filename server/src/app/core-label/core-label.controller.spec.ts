import { Test, TestingModule } from '@nestjs/testing';
import { CoreLabelController } from './core-label.controller';
import { CoreLabelService } from './core-label.service';

describe('CoreLabelController', () => {
  let controller: CoreLabelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoreLabelController],
      providers: [CoreLabelService],
    }).compile();

    controller = module.get<CoreLabelController>(CoreLabelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
