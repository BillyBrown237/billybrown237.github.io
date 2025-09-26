import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ExperienceStatus } from '../enum/experience-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty({
    example: 'Senior Backend Developer',
    description: 'Job title or role',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Tech Corp', description: 'Company or organization' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ example: '2023-01-01', description: 'Start date (ISO 8601)' })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2024-06-30',
    description: 'End date (ISO 8601)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    example: 'Built scalable APIs with NestJS and PostgreSQL',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: ExperienceStatus,
    example: ExperienceStatus.IN_PROGRESS,
  })
  @IsEnum(ExperienceStatus)
  status: ExperienceStatus;
}
