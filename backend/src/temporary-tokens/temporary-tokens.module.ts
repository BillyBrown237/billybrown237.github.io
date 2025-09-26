import { Module } from '@nestjs/common';
import { TemporaryTokensService } from './temporary-tokens.service';
import { TemporaryTokensController } from './temporary-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemporaryToken } from './entities/temporary-token.entity';
import { Permission } from '../permission/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemporaryToken, Permission])],
  controllers: [TemporaryTokensController],
  providers: [TemporaryTokensService],
  exports: [TemporaryTokensService],
})
export class TemporaryTokensModule {}
