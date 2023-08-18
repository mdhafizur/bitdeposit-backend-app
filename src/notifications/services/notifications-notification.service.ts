import { NotificationsGateway } from '../notifications.gateway';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '@src/core/services';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { CreateNotificationDTO } from '../dtos';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class NotificationsNotificationsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => NotificationsGateway))
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async findByCriteria(data: any): Promise<any> {
    const filters = {
      OR: [
        {
          type: 'public',
        },
        { userId: data.userId != null ? data.userId : undefined },
        { groupId: data.groupId != null ? data.groupId : undefined },
      ],
    };
    // FIX ME: this
    const pS = isNaN(data.pageSize) ? data.pageSize : Number(data.pageSize);
    const pI = isNaN(data.pageIndex) ? data.pageIndex : Number(data.pageIndex);
    const notifications =
      await this.prismaService.notificationsNotification.findMany({
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        where: filters,
        take: pS,
        skip: (pI - 1) * pS,
        include: {
          notificationDetail: true,
        },
      });

    const mappedNotification = notifications.map((notification) => {
      return {
        ...notification,
        notificationDetail: notification.notificationDetail[0],
      };
    });

    if (notifications.length === 0) {
      return NoDataFoundResponse;
    }

    return mappedNotification;
  }

  async create(data: CreateNotificationDTO) {
    try {
      const createdNotification =
        await this.prismaService.notificationsNotification.create({
          data: {
            ...data,
          },
        });

      if (createdNotification) {
        this.notificationsGateway.newNotification(createdNotification);
      }
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }
}
