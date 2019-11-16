import { Test, TestingModule } from '@nestjs/testing';
import { SseController } from './sse.controller';

describe('Sse Controller', () => {
  let controller: SseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SseController],
    }).compile();

    controller = module.get<SseController>(SseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
