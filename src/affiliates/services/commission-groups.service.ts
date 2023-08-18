import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  CommissionGroupDTO,
  CommissionGroupQueryDTO,
  UpdateCommissionTypeDTO,
} from '@src/affiliates/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class CommissionGroupsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createCommissionGroupDTO,
  ): Promise<ApiResponseDTO<CommissionGroupDTO>> {
    try {
      const createdCommissionGroup =
        await this.prismaService.affiliatesCommissionGroup.create({
          data: {
            ...createCommissionGroupDTO,
          },
        });

      return {
        status: 'success',
        data: new CommissionGroupDTO(createdCommissionGroup),
        message: 'The Commission Group has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        CommissionGroupsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: CommissionGroupQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      name: query.title,
    };

    try {
      const totalCount =
        await this.prismaService.affiliatesCommissionGroup.count({
          where: filters,
        });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const commissionGroup = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesCommissionGroup.findMany({
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
        data: plainToInstance(CommissionGroupDTO, JSON.parse(commissionGroup)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        CommissionGroupsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<CommissionGroupDTO>> {
    try {
      const commissionGroup = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesCommissionGroup.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(commissionGroup) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(CommissionGroupDTO, JSON.parse(commissionGroup)),
        message: 'Commission Group retrieve successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        CommissionGroupsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    updateCommissionGroupDTO: UpdateCommissionTypeDTO,
  ): Promise<ApiResponseDTO<CommissionGroupDTO>> {
    try {
      const id = updateCommissionGroupDTO.id;
      const updatedCommissionGroupData =
        await this.prismaService.affiliatesCommissionGroup.update({
          where: {
            id: id,
          },
          data: {
            ...updateCommissionGroupDTO,
          },
        });
      return {
        status: 'success',
        data: new CommissionGroupDTO(updatedCommissionGroupData),
        message: 'Commission Group info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        CommissionGroupsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateCommissionGroupStatusDTO: object,
  ): Promise<ApiResponseDTO<CommissionGroupDTO>> {
    try {
      const updatedCommissionGroupData =
        await this.prismaService.affiliatesCommissionGroup.update({
          where: {
            id: id,
          },
          data: {
            ...updateCommissionGroupStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new CommissionGroupDTO(updatedCommissionGroupData),
        message: 'Commission Group status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        CommissionGroupsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.affiliatesCommissionGroup.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        CommissionGroupsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
