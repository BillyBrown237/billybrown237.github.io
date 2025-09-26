import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty({ message: 'The name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'The description is required' })
  description?: string;
}
