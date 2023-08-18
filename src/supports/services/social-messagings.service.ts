import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  SocialMessagingDTO,
  SocialMessagingQueryDTO,
} from '@src/supports/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class SocialMessagingsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createSocialMessagingDTO,
  ): Promise<ApiResponseDTO<SocialMessagingDTO>> {
    try {
      const createdSocialMessaging =
        await this.prismaService.supportsSocialMessaging.create({
          data: {
            ...createSocialMessagingDTO,
          },
        });

      return {
        status: 'success',
        data: new SocialMessagingDTO(createdSocialMessaging),
        message: 'Record has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        SocialMessagingsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: SocialMessagingQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      type: query.type,
      contactNo: query.contactNo,
    };

    try {
      const totalCount = await this.prismaService.supportsSocialMessaging.count(
        {
          where: filters,
        },
      );
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const socialMessaging = JSON.stringify(
        instanceToPlain(
          await this.prismaService.supportsSocialMessaging.findMany({
            orderBy: {
              createdAt: query.orderBy,
            },
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            where: filters,
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(SocialMessagingDTO, JSON.parse(socialMessaging)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        SocialMessagingsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<SocialMessagingDTO>> {
    try {
      const socialMessaging = JSON.stringify(
        instanceToPlain(
          await this.prismaService.supportsSocialMessaging.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(socialMessaging) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(SocialMessagingDTO, JSON.parse(socialMessaging)),
        message: 'Record retrieve successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        SocialMessagingsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateSocialMessagingDTO: object,
  ): Promise<ApiResponseDTO<SocialMessagingDTO>> {
    try {
      const updatedSocialMessagingData =
        await this.prismaService.supportsSocialMessaging.update({
          where: {
            id: id,
          },
          data: {
            ...updateSocialMessagingDTO,
          },
        });
      return {
        status: 'success',
        data: new SocialMessagingDTO(updatedSocialMessagingData),
        message: 'Record info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        SocialMessagingsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateSocialMessagingStatusDTO: object,
  ): Promise<ApiResponseDTO<SocialMessagingDTO>> {
    try {
      const updatedSocialMessagingData =
        await this.prismaService.supportsSocialMessaging.update({
          where: {
            id: id,
          },
          data: {
            ...updateSocialMessagingStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new SocialMessagingDTO(updatedSocialMessagingData),
        message: 'Bet Site status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        SocialMessagingsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.supportsSocialMessaging.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        SocialMessagingsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
