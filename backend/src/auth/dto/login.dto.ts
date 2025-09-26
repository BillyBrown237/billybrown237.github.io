import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description: 'Username of the admin account',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'Str0ngP@ssw0rd!',
    description: 'Password for the account (min 8 chars)',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
