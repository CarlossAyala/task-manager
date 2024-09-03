import { Test, TestingModule } from '@nestjs/testing';
import { CoreLabelService } from './core-label.service';

describe('CoreLabelService', () => {
  let service: CoreLabelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreLabelService],
    }).compile();

    service = module.get<CoreLabelService>(CoreLabelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
