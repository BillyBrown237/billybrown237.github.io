import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CertificationStatus } from '../enum/certification-status.enum';

export class CreateCertificationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  issuer: string;

  // Accept ISO-8601 date string
  @IsDateString()
  dateIssued: string;

  @IsEnum(CertificationStatus)
  status: CertificationStatus;
}
