import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CertificationStatus } from '../enum/certification-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCertificationDto {
  @ApiProperty({
    example: 'AWS Certified Solutions Architect',
    description: 'Name of the certification',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Amazon Web Services',
    description: 'Issuer or organization that issued the certification',
  })
  @IsString()
  @IsNotEmpty()
  issuer: string;

  // Accept ISO-8601 date string
  @ApiProperty({
    example: '2024-05-15',
    description: 'Date the certification was issued (ISO 8601)',
  })
  @IsDateString()
  dateIssued: string;

  @ApiProperty({
    enum: CertificationStatus,
    example: CertificationStatus.COMPLETED,
  })
  @IsEnum(CertificationStatus)
  status: CertificationStatus;
}
