import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { NoDataFoundResponse } from '@src/core/constants';

import {
  CreatePromotionsAuthGroupOwnerPromoCodeDTO,
  PromotionsAuthGroupOwnerPromoCodeDTO,
  PromotionsAuthGroupOwnerPromoCodeQueryDTO,
  UpdatePromotionsAuthGroupOwnerPromoCodeDTO,
} from '../dtos';

@Injectable()
export class PromotionsGroupOwnerPromoCodesService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private prismaService: PrismaService,
  ) {}

  //create new --------
  async create(
    createPromotionsAuthGroupOwnerPromoCodeDTO: CreatePromotionsAuthGroupOwnerPromoCodeDTO,
  ): Promise<ApiResponseDTO<CreatePromotionsAuthGroupOwnerPromoCodeDTO>> {
    try {
      const createdPromoCode =
        await this.prismaService.promotionsAuthGroupOwnerPromoCode.create({
          data: {
            ...createPromotionsAuthGroupOwnerPromoCodeDTO,
          },
        });

      return {
        status: 'success',
        data: new PromotionsAuthGroupOwnerPromoCodeDTO(createdPromoCode),
        message: 'Record has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        PromotionsGroupOwnerPromoCodesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all--------
  async findByCriteria(
    query: PromotionsAuthGroupOwnerPromoCodeQueryDTO,
  ): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    const filters = {
      status: query.status,
      createdBy: query.createdById,
      updatedBy: query.updatedById,
      title: query.title,
      code: query.code,
      groupOwnerId: query.groupOwnerId,
    };

    try {
      const totalCount =
        await this.prismaService.promotionsAuthGroupOwnerPromoCode.count({
          where: filters,
        });

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const totalPages = Math.ceil(totalCount / query.pageSize);

      const promocodes = JSON.stringify(
        instanceToPlain(
          await this.prismaService.promotionsAuthGroupOwnerPromoCode.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            include: {
              promotionUsers: true,
            },
          }),
        ),
      );

      if (JSON.parse(promocodes).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          PromotionsAuthGroupOwnerPromoCodeDTO,
          JSON.parse(promocodes),
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
        PromotionsGroupOwnerPromoCodesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(
    id: string,
  ): Promise<ApiResponseDTO<PromotionsAuthGroupOwnerPromoCodeDTO>> {
    try {
      const promocode = JSON.stringify(
        instanceToPlain(
          await this.prismaService.promotionsAuthGroupOwnerPromoCode.findUnique(
            {
              where: {
                id: id,
              },
              include: {
                promotionUsers: true,
              },
            },
          ),
        ),
      );

      if (JSON.parse(promocode) === null) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          PromotionsAuthGroupOwnerPromoCodeDTO,
          JSON.parse(promocode),
        ),
        message: 'Record has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        PromotionsGroupOwnerPromoCodesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updatePromotionDTO: UpdatePromotionsAuthGroupOwnerPromoCodeDTO,
  ): Promise<ApiResponseDTO<PromotionsAuthGroupOwnerPromoCodeDTO>> {
    try {
      const updatedPromoCode =
        await this.prismaService.promotionsAuthGroupOwnerPromoCode.update({
          where: {
            id: id,
          },
          data: {
            ...updatePromotionDTO,
          },
        });
      return {
        status: 'success',
        data: new PromotionsAuthGroupOwnerPromoCodeDTO(updatedPromoCode),
        message: 'Record has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        PromotionsGroupOwnerPromoCodesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      await this.prismaService.promotionsAuthGroupOwnerPromoCode.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        PromotionsGroupOwnerPromoCodesService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
