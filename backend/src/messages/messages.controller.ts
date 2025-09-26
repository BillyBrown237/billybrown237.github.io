import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { AppPermission } from '../auth/permissions.constants';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Public endpoint for site visitors to send messages
  @ApiOperation({ summary: 'Submit a new contact message (public)' })
  @ApiCreatedResponse({ description: 'Message created successfully' })
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  // Optionally public read; adjust as needed
  @ApiOperation({ summary: 'List all messages' })
  @ApiOkResponse({ description: 'Array of messages' })
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @ApiOperation({ summary: 'Get a message by UUID' })
  @ApiOkResponse({ description: 'Message details' })
  @ApiParam({ name: 'uuid', description: 'Message UUID', type: 'string' })
  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.messagesService.findOne(uuid);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Update a message by UUID' })
  @ApiOkResponse({ description: 'Updated message' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.MessagesUpdate)
  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(uuid, updateMessageDto);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Delete a message by UUID' })
  @ApiOkResponse({ description: 'Message deleted' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.MessagesDelete)
  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.messagesService.remove(uuid);
  }
}
