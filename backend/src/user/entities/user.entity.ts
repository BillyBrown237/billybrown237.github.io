import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
    enum: ['admin', 'owner', 'viewer'],
    default: 'viewer',
  })
  role: 'admin' | 'owner' | 'viewer';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
