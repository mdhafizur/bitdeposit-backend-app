import { PrismaService } from '@src/core/services';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { CreateNotificationDetailDTO } from '../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsNotificationDetailsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateNotificationDetailDTO): Promise<any> {
    try {
      const createdNotificationDetail =
        await this.prismaService.notificationsNotificationDetail.create({
          data: {
            ...data,
          },
        });

      if (createdNotificationDetail) {
        return createdNotificationDetail;
      }
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }
}
