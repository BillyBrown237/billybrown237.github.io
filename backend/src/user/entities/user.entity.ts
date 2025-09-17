import { UserRoles } from 'src/user/enum/user-role.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  username: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  first_name: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  last_name: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  passwordHash: string;
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.VIEWER,
  })
  role: UserRoles;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
