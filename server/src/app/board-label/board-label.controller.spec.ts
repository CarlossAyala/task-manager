import { Test, TestingModule } from '@nestjs/testing';
import { BoardLabelController } from './board-label.controller';
import { BoardLabelService } from './board-label.service';

describe('BoardLabelController', () => {
  let controller: BoardLabelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardLabelController],
      providers: [BoardLabelService],
    }).compile();

    controller = module.get<BoardLabelController>(BoardLabelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
