import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CertificationStatus } from '../enum/certification-status.enum';

export class CreateCertificationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  issuer: string;

  @IsDateString()
  dateIssued: Date;

  @IsEnum(CertificationStatus)
  status: CertificationStatus;
}
