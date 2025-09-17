import { Permission } from 'src/permission/entities/permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TemporaryToken {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  token: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @Column()
  expiredAt: Date;

  @Column({ default: false })
  used: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
