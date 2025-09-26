import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './entities/testimonial.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly repo: Repository<Testimonial>,
  ) {}

  async create(dto: CreateTestimonialDto) {
    const entity = this.repo.create({
      name: dto.name,
      message: dto.message,
    });
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(uuid: string) {
    const entity = await this.repo.findOne({ where: { uuid } });
    if (!entity)
      throw new NotFoundException(`Testimonial with id ${uuid} not found`);
    return entity;
  }

  async update(uuid: string, dto: UpdateTestimonialDto) {
    const existing = await this.repo.findOne({ where: { uuid } });
    if (!existing)
      throw new NotFoundException(`Testimonial with id ${uuid} not found`);
    const merged = this.repo.merge(existing, dto);
    return await this.repo.save(merged);
  }

  async remove(uuid: string) {
    const existing = await this.repo.findOne({ where: { uuid } });
    if (!existing)
      throw new NotFoundException(`Testimonial with id ${uuid} not found`);
    await this.repo.remove(existing);
    return { deleted: true } as const;
  }
}
