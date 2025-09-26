import { ConflictException, Injectable } from '@nestjs/common';
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

  async findOne(id: number) {
    return await `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
