import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  CommissionTypeDTO,
  CommissionTypeQueryDTO,
  UpdateCommissionTypeDTO,
} from '@src/affiliates/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class CommissionTypesService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createCommissionTypeDTO,
  ): Promise<ApiResponseDTO<CommissionTypeDTO>> {
    try {
      const createdCommissionType =
        await this.prismaService.affiliatesCommissionType.create({
          data: {
            ...createCommissionTypeDTO,
          },
        });

      return {
        status: 'success',
        data: new CommissionTypeDTO(createdCommissionType),
        message: 'The Commission Type has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        CommissionTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: CommissionTypeQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      name: query.title,
    };

    try {
      const totalCount =
        await this.prismaService.affiliatesCommissionType.count({
          where: filters,
        });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const commissionType = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesCommissionType.findMany({
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
        data: plainToInstance(CommissionTypeDTO, JSON.parse(commissionType)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        CommissionTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<CommissionTypeDTO>> {
    try {
      const commissionType = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesCommissionType.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(commissionType) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(CommissionTypeDTO, JSON.parse(commissionType)),
        message: 'Commission Type retrieve successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        CommissionTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    updateCommissionTypeDTO: UpdateCommissionTypeDTO,
  ): Promise<ApiResponseDTO<CommissionTypeDTO>> {
    try {
      const id = updateCommissionTypeDTO.id;
      const updatedCommissionTypeData =
        await this.prismaService.affiliatesCommissionType.update({
          where: {
            id: id,
          },
          data: {
            ...updateCommissionTypeDTO,
          },
        });
      return {
        status: 'success',
        data: new CommissionTypeDTO(updatedCommissionTypeData),
        message: 'Commission Type info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        CommissionTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateCommissionTypeStatusDTO: object,
  ): Promise<ApiResponseDTO<CommissionTypeDTO>> {
    try {
      const updatedCommissionTypeData =
        await this.prismaService.affiliatesCommissionType.update({
          where: {
            id: id,
          },
          data: {
            ...updateCommissionTypeStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new CommissionTypeDTO(updatedCommissionTypeData),
        message: 'Bet Site status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        CommissionTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.affiliatesCommissionType.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        CommissionTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
