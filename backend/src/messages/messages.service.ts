import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly repo: Repository<Message>,
  ) {}

  async create(dto: CreateMessageDto) {
    const entity = this.repo.create({
      name: dto.name,
      email: dto.email,
      content: dto.content,
    });
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(uuid: string) {
    const entity = await this.repo.findOne({ where: { uuid } });
    if (!entity)
      throw new NotFoundException(`Message with id ${uuid} not found`);
    return entity;
  }

  async update(uuid: string, dto: UpdateMessageDto) {
    const existing = await this.repo.findOne({ where: { uuid } });
    if (!existing)
      throw new NotFoundException(`Message with id ${uuid} not found`);
    const merged = this.repo.merge(existing, dto);
    return await this.repo.save(merged);
  }

  async remove(uuid: string) {
    const existing = await this.repo.findOne({ where: { uuid } });
    if (!existing)
      throw new NotFoundException(`Message with id ${uuid} not found`);
    await this.repo.remove(existing);
    return { deleted: true } as const;
  }
}
