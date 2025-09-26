import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTemporaryTokenDto } from './dto/create-temporary-token.dto';
import { UpdateTemporaryTokenDto } from './dto/update-temporary-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TemporaryToken } from './entities/temporary-token.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class TemporaryTokensService {
  constructor(
    @InjectRepository(TemporaryToken)
    private readonly repo: Repository<TemporaryToken>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async create(createTemporaryTokenDto: CreateTemporaryTokenDto) {
    const { permissionIds, timeToLiveInMinutes = 30 } = createTemporaryTokenDto;
    //Check if permission uuids sent exist
    const permissions = await this.permissionRepo.findBy({
      uuid: In(permissionIds),
    });
    if (permissions.length !== permissionIds.length) {
      throw new BadRequestException('One or more permissions are invalid');
    }
    const token = randomBytes(16).toString('hex');
    const expiredAt = new Date(Date.now() + timeToLiveInMinutes * 60 * 1000);
    const tempToken = this.repo.create({ token, permissions, expiredAt });
    return await this.repo.save(tempToken);
  }

  async validateToken(token: string) {
    const record = await this.repo.findOne({
      where: { token },
      relations: ['permissions'],
    });

    if (!record || record.used || record.expiredAt < new Date()) return null;

    return record;
  }

  async findAll() {
    return await this.repo.find({ relations: ['permissions'] });
  }

  async findOne(uuid: string) {
    const result = await this.repo.findOne({
      where: { uuid },
      relations: ['permissions'],
    });
    if (!result) {
      throw new NotFoundException(
        `TemporaryToken with uuid "${uuid}" not found`,
      );
    }
    return result;
  }

  async patchUpdate(
    uuid: string,
    updateTemporaryTokenDto: UpdateTemporaryTokenDto,
  ) {
    const token = await this.findOne(uuid);

    // Update permissions if provided
    if (updateTemporaryTokenDto.permissionIds) {
      const permissions = await this.permissionRepo.findBy({
        uuid: In(updateTemporaryTokenDto.permissionIds),
      });
      if (permissions.length !== updateTemporaryTokenDto.permissionIds.length) {
        throw new BadRequestException('One or more permissions are invalid');
      }
      const permissionMap = new Map<string, Permission>([
        ...token.permissions.map((p) => [p.uuid, p] as [string, Permission]),
        ...permissions.map((p) => [p.uuid, p] as [string, Permission]),
      ]);
      token.permissions = Array.from(permissionMap.values());
    }

    // Update TTL if provided
    if (updateTemporaryTokenDto.timeToLiveInMinutes) {
      token.expiredAt = new Date(
        Date.now() + updateTemporaryTokenDto.timeToLiveInMinutes * 60 * 1000,
      );
    }

    return await this.repo.save(token);
  }

  async putUpdate(
    uuid: string,
    updateTemporaryTokenDto: UpdateTemporaryTokenDto,
  ) {
    const token = await this.findOne(uuid);

    if (updateTemporaryTokenDto.permissionIds) {
      const permissions = await this.permissionRepo.findBy({
        uuid: In(updateTemporaryTokenDto.permissionIds),
      });

      if (permissions.length !== updateTemporaryTokenDto.permissionIds.length) {
        throw new BadRequestException('One or more permissions are invalid');
      }

      // Replace old permissions completely
      token.permissions = permissions;
    }

    if (updateTemporaryTokenDto.timeToLiveInMinutes) {
      token.expiredAt = new Date(
        Date.now() + updateTemporaryTokenDto.timeToLiveInMinutes * 60 * 1000,
      );
    }

    return await this.repo.save(token);
  }

  async remove(uuid: string): Promise<DeleteResult> {
    const result = await this.repo.delete(uuid);
    if (result.affected === 0) {
      throw new NotFoundException(
        `TemporaryToken with uuid "${uuid}" not found`,
      );
    }
    return result;
  }

  async markUsed(uuid: string) {
    const token = await this.findOne(uuid);
    token.used = true;
    return await this.repo.save(token);
  }
}
