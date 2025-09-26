import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './entities/experience.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly repo: Repository<Experience>,
  ) {}

  async create(dto: CreateExperienceDto) {
    const toCreate: Partial<Experience> = {
      title: dto.title,
      company: dto.company,
      startDate: new Date(dto.startDate),
      endDate: dto.endDate ? new Date(dto.endDate) : null,
      description: dto.description ?? null,
      status: dto.status,
    };
    const entity = this.repo.create(toCreate);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(uuid: string) {
    const entity = await this.repo.findOne({ where: { uuid } });
    if (!entity) throw new NotFoundException(`Experience with id ${uuid} not found`);
    return entity;
  }

  async update(uuid: string, dto: UpdateExperienceDto) {
    const existing = await this.findOne(uuid);
    const merged = this.repo.merge(existing, {
      ...dto,
      startDate: dto.startDate ? new Date(dto.startDate) : existing.startDate,
      endDate: dto.endDate ? new Date(dto.endDate) : existing.endDate,
    } as any);
    return await this.repo.save(merged);
  }

  async remove(uuid: string) {
    const entity = await this.findOne(uuid);
    await this.repo.remove(entity);
    return { deleted: true };
  }
}
