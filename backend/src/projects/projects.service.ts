import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

function arrayToStored(value?: string[]): string | null {
  if (!value || value.length === 0) return null;
  return value.join(',');
}

function storedToArray(value?: string | null): string[] | undefined {
  if (!value) return undefined;
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto) {
    const toCreate: Partial<Project> = {
      title: dto.title,
      description: dto.description,
      repoUrl: dto.repoUrl ?? null,
      demoUrl: dto.demoUrl ?? null,
      techStack: arrayToStored(dto.techStack),
      startDate: dto.startDate ? new Date(dto.startDate) : null,
      endDate: dto.endDate ? new Date(dto.endDate) : null,
      status: dto.status,
    };
    const entity = this.repo.create(toCreate);
    return await this.repo.save(entity);
  }

  async findAll() {
    const list = await this.repo.find({ order: { createdAt: 'DESC' } });
    return list.map(
      (p) => ({ ...p, techStack: storedToArray(p.techStack) }) as any,
    );
  }

  async findOne(uuid: string) {
    const entity = await this.repo.findOne({ where: { uuid } });
    if (!entity)
      throw new NotFoundException(`Project with id ${uuid} not found`);
    return { ...entity, techStack: storedToArray(entity.techStack) } as any;
  }

  async update(uuid: string, dto: UpdateProjectDto) {
    const existing = await this.repo.findOne({ where: { uuid } });
    if (!existing)
      throw new NotFoundException(`Project with id ${uuid} not found`);
    const merged = this.repo.merge(existing, {
      ...dto,
      repoUrl: dto.repoUrl ?? existing.repoUrl,
      demoUrl: dto.demoUrl ?? existing.demoUrl,
      techStack: dto.techStack
        ? arrayToStored(dto.techStack)
        : existing.techStack,
      startDate: dto.startDate ? new Date(dto.startDate) : existing.startDate,
      endDate: dto.endDate ? new Date(dto.endDate) : existing.endDate,
    } as any);
    const saved = await this.repo.save(merged);
    return { ...saved, techStack: storedToArray(saved.techStack) } as any;
  }

  async remove(uuid: string) {
    const entity = await this.repo.findOne({ where: { uuid } });
    if (!entity)
      throw new NotFoundException(`Project with id ${uuid} not found`);
    await this.repo.remove(entity);
    return { deleted: true };
  }
}
