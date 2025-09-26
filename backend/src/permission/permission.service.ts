import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const { name } = createPermissionDto;
    const permission = await this.permissionRepository.findOne({
      where: { name },
    });
    if (permission)
      throw new ConflictException(
        `Permission with name ${permission.name} already exists`,
      );

    const perm = this.permissionRepository.create(createPermissionDto);
    return await this.permissionRepository.save(perm);
  }

  async findAll() {
    return await this.permissionRepository.find();
  }

  async findOne(uuid: string) {
    const perm = await this.permissionRepository.findOne({ where: { uuid } });
    if (!perm) throw new NotFoundException('Permission not found');
    return perm;
  }

  async update(uuid: string, updatePermissionDto: UpdatePermissionDto) {
    const perm = await this.permissionRepository.findOne({ where: { uuid } });
    if (!perm) throw new NotFoundException('Permission not found');
    Object.assign(perm, updatePermissionDto);
    return await this.permissionRepository.save(perm);
  }

  async remove(uuid: string) {
    const perm = await this.permissionRepository.findOne({ where: { uuid } });
    if (!perm) throw new NotFoundException('Permission not found');
    await this.permissionRepository.remove(perm);
    return { success: true };
  }
}
