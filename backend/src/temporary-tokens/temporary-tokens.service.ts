import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTemporaryTokenDto } from './dto/create-temporary-token.dto';
import { UpdateTemporaryTokenDto } from './dto/update-temporary-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TemporaryToken } from './entities/temporary-token.entity';
import { Repository } from 'typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class TemporaryTokensService {
  constructor(
    @InjectRepository(TemporaryToken)
    private repo: Repository<TemporaryToken>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}
  async create(createTemporaryTokenDto: CreateTemporaryTokenDto) {
    const { permissionIds, timeToLiveInMinutes = 30 } = createTemporaryTokenDto;
    const permissions = await this.permissionRepo.findByIds(permissionIds);
    if (permissions.length !== permissionIds.length) {
      throw new BadRequestException('One or more permissions are invalid');
    }
    const token = randomBytes(16).toString('hex');
    const expiredAt = new Date(Date.now() + timeToLiveInMinutes * 60 * 1000);
    const tempToken = this.repo.create({ token, permissions, expiredAt });
    return this.repo.save(tempToken);
  }

  async validateToken(token: string) {
    const record = await this.repo.findOne({
      where: { token },
      relations: ['permissions'],
    });

    if (!record || record.used || record.expiredAt < new Date()) return null;

    return record;
  }

  findAll() {
    return `This action returns all temporaryTokens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} temporaryToken`;
  }

  update(id: number, updateTemporaryTokenDto: UpdateTemporaryTokenDto) {
    return `This action updates a #${id} temporaryToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} temporaryToken`;
  }
}
