import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  Req,
  ParseUUIDPipe, Put,
} from '@nestjs/common';
import { TemporaryTokensService } from './temporary-tokens.service';
import { CreateTemporaryTokenDto } from './dto/create-temporary-token.dto';
import { UpdateTemporaryTokenDto } from './dto/update-temporary-token.dto';
import { UserRoles } from 'src/user/enum/user-role.enum';
import type { Request } from 'express';

@Controller('temporary-tokens')
export class TemporaryTokensController {
  constructor(
    private readonly temporaryTokensService: TemporaryTokensService,
  ) {}

  @Post()
  async create(
    @Body() createTemporaryTokenDto: CreateTemporaryTokenDto,
    @Req() req: Request,
  ) {
    // const role = req?.auth?.role;
    const role = UserRoles.ADMIN as UserRoles;
    if (role !== UserRoles.ADMIN && role !== UserRoles.OWNER) {
      throw new ForbiddenException(
        `Only ${UserRoles.ADMIN} or ${UserRoles.OWNER} can generate token`,
      );
    }
    return await this.temporaryTokensService.create(createTemporaryTokenDto);
  }

  @Get()
  async findAll() {
    return await this.temporaryTokensService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return await this.temporaryTokensService.findOne(uuid);
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateTemporaryTokenDto: UpdateTemporaryTokenDto,
  ) {
    return await this.temporaryTokensService.patchUpdate(
      uuid,
      updateTemporaryTokenDto,
    );
  }

  @Put(':uuid')
  async replace(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateTemporaryTokenDto: UpdateTemporaryTokenDto,
  ) {
    return await this.temporaryTokensService.putUpdate(
      uuid,
      updateTemporaryTokenDto,
    );
  }

  @Delete(':uuid')
  async remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return await this.temporaryTokensService.remove(uuid);
  }
}
