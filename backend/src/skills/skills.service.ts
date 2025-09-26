import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly repo: Repository<Skill>,
  ) {}

  async create(dto: CreateSkillDto) {
    const entity = this.repo.create({
      name: dto.name,
      level: dto.level,
      category: dto.category ?? null,
    });
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(uuid: string) {
    const skill = await this.repo.findOne({ where: { uuid } });
    if (!skill) throw new NotFoundException(`Skill with id ${uuid} not found`);
    return skill;
  }

  async update(uuid: string, dto: UpdateSkillDto) {
    const existing = await this.findOne(uuid);
    const merged = this.repo.merge(existing, dto as any);
    return await this.repo.save(merged);
  }

  async remove(uuid: string) {
    const existing = await this.findOne(uuid);
    await this.repo.remove(existing);
    return { deleted: true };
  }
}
