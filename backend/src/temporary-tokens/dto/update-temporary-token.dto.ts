import { PartialType } from '@nestjs/mapped-types';
import { CreateTemporaryTokenDto } from './create-temporary-token.dto';

export class UpdateTemporaryTokenDto extends PartialType(
  CreateTemporaryTokenDto,
) {}
