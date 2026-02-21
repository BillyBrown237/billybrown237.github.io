import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/user/enum/user-role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
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
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  username: string;

  @ApiProperty({ description: 'The first name of the user.', example: 'John' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  first_name: string;

  @ApiProperty({ description: 'The last name of the user.', example: 'Doe' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  last_name: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john.doe@example.com',
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user.',
    example: 'hashed-password-string',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  passwordHash: string;

  @ApiProperty({
    description: 'The role of the user within the system.',
    enum: UserRoles,
  })
  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.VIEWER })
  role: UserRoles;

  @ApiProperty({
    description: 'Short biography of the user.',
    example: 'Full-stack developer passionate about web technologies.',
  })
  @Column({ type: 'text', nullable: true })
  bio?: string;

  @ApiProperty({
    description: 'The URL or path to the user’s profile picture.',
    example: 'https://example.com/images/johndoe.jpg',
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImageUrl?: string;

  @ApiProperty({
    description: 'The URL to the user’s resume/CV.',
    example: 'https://example.com/resume/johndoe.pdf',
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  resumeUrl?: string;

  @ApiProperty({
    description: 'User social media links.',
    example: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      instagram: 'https://instagram.com/johndoe',
    },
  })
  @Column({ type: 'json', nullable: true })
  socials?: Record<string, string> | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
