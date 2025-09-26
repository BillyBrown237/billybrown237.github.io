import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The unique identifier of the user.',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    description: 'The unique username of the user.',
    example: 'johndoe',
  })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  username: string;

  @ApiProperty({
    description: 'The first name of the user.',
    example: 'John',
  })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  first_name: string;

  @ApiProperty({
    description: 'The last name of the user.',
    example: 'Doe',
  })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  last_name: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john.doe@example.com',
  })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user.',
    example: 'hashed-password-string',
  })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  passwordHash: string;

  @ApiProperty({
    description: 'The role of the user within the system.',
    enum: UserRoles,
    example: UserRoles.VIEWER,
  })
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.VIEWER,
  })
  role: UserRoles;

  @ApiProperty({
    description: 'The URL or path to the user’s profile picture.',
    example: 'https://example.com/images/johndoe.jpg',
    nullable: true,
  })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  profile_picture: string;

  @ApiProperty({
    description: 'The date and time the user was created.',
    example: '2023-10-27T10:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the user was last updated.',
    example: '2023-10-27T10:30:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
