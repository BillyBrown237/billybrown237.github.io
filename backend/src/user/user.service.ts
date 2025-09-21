import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(uuid: string) {
    const user = await this.userRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException(`User with ID ${uuid} not found`);
    }
    return `This action returns a #${uuid} user`;
  }

  async findByUsername(username: string) {
    console.info('Username', username);
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  update(uuid: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${uuid} user`;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} user`;
  }
}
