import { Body, Controller, Get, Post, Query, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateNotificationDTO } from '../dtos';
import { NotificationsNotificationsService } from '../services';

@Controller('notifications')
@ApiTags('Notificaitons')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsNotificationsService,
  ) {}

  @Get()
  @Version('1')
  async findAll() {
    // return await this.notificationsService.findAll();
    return 0;
  }

  @Get('query')
  @Version('1')
  async findByCriteria(@Query() query: any) {
    return await this.notificationsService.findByCriteria(query);
  }

  @Post()
  @Version('1')
  async create(@Body() data: CreateNotificationDTO) {
    await this.notificationsService.create(data);
  }
}
