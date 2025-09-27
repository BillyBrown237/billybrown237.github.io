import { Test, TestingModule } from '@nestjs/testing';
import { TemporaryTokensController } from './temporary-tokens.controller';
import { TemporaryTokensService } from './temporary-tokens.service';

describe('TemporaryTokensController', () => {
  let controller: TemporaryTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemporaryTokensController],
      providers: [TemporaryTokensService],
    }).compile();

    controller = module.get<TemporaryTokensController>(
      TemporaryTokensController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
