import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateTemporaryTokenDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one permission must be selected' })
  @IsUUID('4', { each: true, message: 'Each permission must be a valid UUID' })
  permissionIds: string[];

  @IsOptional()
  @IsInt({ message: 'time to live in minutes must be an interger' })
  @Min(5, { message: 'time to live in minutes must be at least 5 minutes' })
  @Max(60, {
    message: 'time to live in minutes must cannot exceed 60 minutes ( 1hr )',
  })
  timeToLiveInMinutes?: number;
}
