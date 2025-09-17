import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CertificationStatus } from '../enum/certification-status.enum';

@Entity()
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  issuer: string;

  @Column({ type: 'date' })
  dateIssued: Date;

  @Column({
    type: 'enum',
    enum: CertificationStatus,
    default: CertificationStatus.PLANNED,
  })
  status: CertificationStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
