import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a new admin user.
 * This DTO ensures that the client cannot set the 'role' field.
 * The role will be set to UserRoles.ADMIN on the backend.
 */
export class RegisterDto {
  @ApiProperty({ example: 'admin', minLength: 3, maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  username: string;

  @ApiProperty({ example: 'Billy', minLength: 2, maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  first_name: string;

  @ApiProperty({ example: 'Brown', minLength: 2, maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  last_name: string;

  @ApiProperty({
    example: 'Str0ngP@ssw0rd!',
    minLength: 8,
    description: 'Must include upper, lower, number, and special character',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[@$.!%*?&])/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
