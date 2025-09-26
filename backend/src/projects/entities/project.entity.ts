import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  repoUrl?: string | null;

  @Column({ type: 'text', nullable: true })
  demoUrl?: string | null;

  @Column({ type: 'text', array: false, nullable: true })
  techStack?: string | null; // stored as comma-separated list

  @Column({ type: 'timestamp with time zone', nullable: true })
  startDate?: Date | null;

  @Column({ type: 'timestamp with time zone', nullable: true })
  endDate?: Date | null;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
