import { NotificationsGateway } from './notifications.gateway';
import { Module } from '@nestjs/common';
import {
  NotificationsNotificationDetailsService,
  NotificationsNotificationsService,
} from './services';
import { NotificationsController } from './controllers';

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsGateway,
    NotificationsNotificationsService,
    NotificationsNotificationDetailsService,
  ],
  exports: [
    NotificationsGateway,
    NotificationsNotificationsService,
    NotificationsNotificationDetailsService,
  ],
})
export class NotificationsModule {}
