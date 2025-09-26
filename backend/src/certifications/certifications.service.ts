import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certification } from './entities/certification.entity';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certification)
    private readonly certRepo: Repository<Certification>,
  ) {}

  async create(createCertificationDto: CreateCertificationDto) {

    const toCreate: Partial<Certification> = {
      ...createCertificationDto,
      // Ensure dateIssued is a Date instance
      dateIssued: createCertificationDto.dateIssued
        ? new Date(createCertificationDto.dateIssued as unknown as string)
        : undefined,
    };
    const certification = this.certRepo.create(toCreate);
    return await this.certRepo.save(certification);
  }

  async findAll() {
    return await this.certRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(uuid: string) {
    const cert = await this.certRepo.findOne({ where: { uuid } });
    if (!cert)
      throw new NotFoundException(`Certification with id ${uuid} not found`);
    return cert;
  }

  async update(uuid: string, updateCertificationDto: UpdateCertificationDto) {
    const existing = await this.findOne(uuid);
    const merged = this.certRepo.merge(existing, {
      ...updateCertificationDto,
      dateIssued: updateCertificationDto.dateIssued
        ? new Date(updateCertificationDto.dateIssued as unknown as string)
        : existing.dateIssued,
    });
    return await this.certRepo.save(merged);
  }

  async remove(uuid: string) {
    const cert = await this.findOne(uuid);
    await this.certRepo.remove(cert);
    return { deleted: true };
  }
}
