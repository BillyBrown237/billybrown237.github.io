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
  create(
    @Body() createTemporaryTokenDto: CreateTemporaryTokenDto,
    @Req() req: Request,
  ) {

    if (
      req.auth.role !== UserRoles.ADMIN ||
      req.auth.role !== UserRoles.OWNER
    ) {
      throw new ForbiddenException(
        `Only ${UserRoles.ADMIN} or ${UserRoles.OWNER} can generate token`,
      );
    }
    return this.temporaryTokensService.create(createTemporaryTokenDto);
  }

  @Get()
  findAll() {
    return this.temporaryTokensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.temporaryTokensService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTemporaryTokenDto: UpdateTemporaryTokenDto,
  ) {
    return this.temporaryTokensService.update(+id, updateTemporaryTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.temporaryTokensService.remove(+id);
  }
}
