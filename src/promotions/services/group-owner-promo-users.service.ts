import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';

import { NoDataFoundResponse } from '@src/core/constants';
import {
  CreatePromotionsGroupOwnerPromoUserDTO,
  PromotionsGroupOwnerPromoUserDTO,
  PromotionsGroupOwnerPromoUserQueryDTO,
} from '../dtos';

@Injectable()
export class PromotionGroupOwnerPromoUsersService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private prismaService: PrismaService,
  ) {}

  //create new --------
  async create(
    createPromotionsGroupOwnerPromoUserDTO: CreatePromotionsGroupOwnerPromoUserDTO,
  ): Promise<ApiResponseDTO<PromotionsGroupOwnerPromoUserDTO>> {
    try {
      const createdGroupOwnerPromoUser =
        await this.prismaService.promotionsGroupOwnerPromoUser.create({
          data: {
            ...createPromotionsGroupOwnerPromoUserDTO,
          },
        });

      return {
        status: 'success',
        data: new PromotionsGroupOwnerPromoUserDTO(createdGroupOwnerPromoUser),
        message: 'Record has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        PromotionGroupOwnerPromoUsersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  // findByCriteria--------
  async findByCriteria(
    query: PromotionsGroupOwnerPromoUserQueryDTO,
  ): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    const filters = {
      status: query.status,
      createdBy: query.createdById,
      updatedBy: query.updatedById,
      promotionId: query.promotionId,
      userId: query.userId,
    };

    try {
      const totalCount =
        await this.prismaService.promotionsGroupOwnerPromoUser.count({
          where: filters,
        });

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const totalPages = Math.ceil(totalCount / query.pageSize);

      const promotionGroupOwnerPromoUsers = JSON.stringify(
        instanceToPlain(
          await this.prismaService.promotionsGroupOwnerPromoUser.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
          }),
        ),
      );

      if (JSON.parse(promotionGroupOwnerPromoUsers).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          PromotionsGroupOwnerPromoUserDTO,
          JSON.parse(promotionGroupOwnerPromoUsers),
        ),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
        message: 'Records has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findByCriteria()',
        error.stack,
        PromotionGroupOwnerPromoUsersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(
    id: string,
  ): Promise<ApiResponseDTO<PromotionsGroupOwnerPromoUserDTO>> {
    try {
      const promotionsGroupOwnerPromoUser = JSON.stringify(
        instanceToPlain(
          await this.prismaService.promotionsGroupOwnerPromoUser.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(promotionsGroupOwnerPromoUser) === null) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          PromotionsGroupOwnerPromoUserDTO,
          JSON.parse(promotionsGroupOwnerPromoUser),
        ),
        message: 'Records has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        PromotionGroupOwnerPromoUsersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updatePromotionGroupOwnerPromoUserDTO: object,
  ): Promise<ApiResponseDTO<PromotionsGroupOwnerPromoUserDTO>> {
    try {
      const updatedPromotionsGroupOwnerPromoUser =
        await this.prismaService.promotionsGroupOwnerPromoUser.update({
          where: {
            id: id,
          },
          data: {
            ...updatePromotionGroupOwnerPromoUserDTO,
          },
        });
      return {
        status: 'success',
        data: new PromotionsGroupOwnerPromoUserDTO(
          updatedPromotionsGroupOwnerPromoUser,
        ),
        message: 'Record has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        PromotionGroupOwnerPromoUsersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      await this.prismaService.promotionsGroupOwnerPromoUser.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        PromotionGroupOwnerPromoUsersService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
