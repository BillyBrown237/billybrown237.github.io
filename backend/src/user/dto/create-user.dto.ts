import { UserRoles } from '../enum/user-role.enum';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  first_name: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  last_name: string;

  @IsString()
  role: UserRoles;
}
