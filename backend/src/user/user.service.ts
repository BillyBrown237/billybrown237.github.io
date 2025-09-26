import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from './enum/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (user)
      throw new ConflictException(
        `User with username ${user.username} already exists`,
      );
    if (createUserDto.role === UserRoles.ADMIN)
      throw new UnauthorizedException(
        'You cannot create an admin user using this Route',
      );
    const { password, ...rest } = createUserDto;
    // Hashing the user password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = this.userRepository.create({
      ...rest,
      passwordHash: passwordHash,
    });
    return await this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(uuid: string) {
    const user = await this.userRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException(`User with ID ${uuid} not found`);
    }
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    return await this.findOne(uuid);
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} user`;
  }
}
