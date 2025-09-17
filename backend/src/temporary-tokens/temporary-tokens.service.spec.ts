import { Test, TestingModule } from '@nestjs/testing';
import { TemporaryTokensService } from './temporary-tokens.service';

describe('TemporaryTokensService', () => {
  let service: TemporaryTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemporaryTokensService],
    }).compile();

    service = module.get<TemporaryTokensService>(TemporaryTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
