import { Module } from '@nestjs/common';
import { TemporaryTokensService } from './temporary-tokens.service';
import { TemporaryTokensController } from './temporary-tokens.controller';

@Module({
  controllers: [TemporaryTokensController],
  providers: [TemporaryTokensService],
})
export class TemporaryTokensModule {}
