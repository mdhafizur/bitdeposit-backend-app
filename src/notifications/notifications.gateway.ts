// https://www.prisma.io/docs/concepts/components/prisma-client/middleware

import { Inject, Injectable, LoggerService, UseFilters } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsCatchAllFilter } from './exceptions/ws-catch-all-filter';
import { Namespace, Server } from 'socket.io';
import {
  NotificationsNotificationDetailsService,
  NotificationsNotificationsService,
} from './services';
import { CreateNotificationDTO } from './dtos';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';

@Injectable()
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'notifications',
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() io: Namespace;
  server: Server;

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly notificationsService: NotificationsNotificationsService,
    private readonly notificationDetailsService: NotificationsNotificationDetailsService,
  ) {}

  handleConnection(client: any, ...args: any[]) {
    console.log('websocket connected');
    // console.log(client);
  }

  afterInit(): void {
    this.logger.log(
      'NotificationsGateway initialized',
      NotificationsGateway.name,
    );
    console.log('Websocket Gateway initialized');
  }

  handleDisconnect(client: any) {
    console.log('disconnect');
  }

  @SubscribeMessage('findNotificationByCriteria')
  async findNotificationByCriteria(
    @ConnectedSocket() client: any,
    @MessageBody() data: any,
  ) {
    console.log(data);
    const notifications = await this.notificationsService.findByCriteria(data);

    // this.server.emit('newNotification', { name: 'qmit' });
    return notifications;
  }

  @SubscribeMessage('createNotificationDetail')
  async createNotificationDetail(
    @ConnectedSocket() client: any,
    @MessageBody() data: any,
  ) {
    console.log(data);

    try {
      const createdNotificationDetail =
        await this.notificationDetailsService.create({
          isSeen: true,
          notificationId: data.id,
          userId: data.seenBy,
        });

      if (createdNotificationDetail) {
        this.io.emit('createdNotificationDetail', {
          createdNotificationDetail,
        });
      }
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  newNotification = (data: CreateNotificationDTO) => {
    this.io.emit('newNotification', data);
  };
}
