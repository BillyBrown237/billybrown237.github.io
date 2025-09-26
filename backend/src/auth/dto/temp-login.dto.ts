import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TempLoginDto {
  @ApiProperty({
    description: 'Temporary access token string',
    example: 'f1a2b3c4d5e6f7g8h9i0',
  })
  @IsString()
  @Length(10, 100)
  token: string;
}
