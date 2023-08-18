import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  GroupOwnerCommissionStructureDTO,
  GroupOwnerCommissionStructureQueryDTO,
  UpdateGroupOwnerCommissionStructureDTO,
} from '@src/affiliates/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class GroupOwnerCommissionStructureService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createGroupOwnerCommissionStructureDTO,
  ): Promise<ApiResponseDTO<GroupOwnerCommissionStructureDTO>> {
    try {
      const createdGroupOwnerCommissionStructure =
        await this.prismaService.affiliatesGroupOwnerCommissionStructure.create(
          {
            data: {
              ...createGroupOwnerCommissionStructureDTO,
            },
          },
        );

      return {
        status: 'success',
        data: new GroupOwnerCommissionStructureDTO(
          createdGroupOwnerCommissionStructure,
        ),
        message: 'Record has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        GroupOwnerCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(
    query: GroupOwnerCommissionStructureQueryDTO,
  ): Promise<any> {
    const filters = {
      status: query.status,
      authGroupOwnerId: query.authGroupOwnerId,
      commissionGroupId: query.commissionGroupId,
    };

    try {
      const totalCount =
        await this.prismaService.affiliatesGroupOwnerCommissionStructure.count({
          where: filters,
        });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const groupOwnerCommissionStructure = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupOwnerCommissionStructure.findMany(
            {
              orderBy: {
                createdAt: query.orderBy,
              },
              take: query.pageSize,
              skip: (query.pageIndex - 1) * query.pageSize,
              where: filters,
            },
          ),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(
          GroupOwnerCommissionStructureDTO,
          JSON.parse(groupOwnerCommissionStructure),
        ),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        GroupOwnerCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(
    id: string,
  ): Promise<ApiResponseDTO<GroupOwnerCommissionStructureDTO>> {
    try {
      const groupOwnerCommissionStructure = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupOwnerCommissionStructure.findUnique(
            {
              where: {
                id: id,
              },
            },
          ),
        ),
      );

      if (JSON.parse(groupOwnerCommissionStructure) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(
          GroupOwnerCommissionStructureDTO,
          JSON.parse(groupOwnerCommissionStructure),
        ),
        message: 'Record retrieve successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        GroupOwnerCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    updateGroupOwnerCommissionStructureDTO: UpdateGroupOwnerCommissionStructureDTO,
  ): Promise<ApiResponseDTO<GroupOwnerCommissionStructureDTO>> {
    try {
      const id = updateGroupOwnerCommissionStructureDTO.id;
      const updatedGroupOwnerCommissionStructureData =
        await this.prismaService.affiliatesGroupOwnerCommissionStructure.update(
          {
            where: {
              id: id,
            },
            data: {
              ...updateGroupOwnerCommissionStructureDTO,
            },
          },
        );
      return {
        status: 'success',
        data: new GroupOwnerCommissionStructureDTO(
          updatedGroupOwnerCommissionStructureData,
        ),
        message: 'Record info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        GroupOwnerCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateGroupOwnerCommissionStructureStatusDTO: object,
  ): Promise<ApiResponseDTO<GroupOwnerCommissionStructureDTO>> {
    try {
      const updatedGroupOwnerCommissionStructureData =
        await this.prismaService.affiliatesGroupOwnerCommissionStructure.update(
          {
            where: {
              id: id,
            },
            data: {
              ...updateGroupOwnerCommissionStructureStatusDTO,
            },
          },
        );
      return {
        status: 'success',
        data: new GroupOwnerCommissionStructureDTO(
          updatedGroupOwnerCommissionStructureData,
        ),
        message: 'Bet Site status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        GroupOwnerCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.affiliatesGroupOwnerCommissionStructure.delete(
        {
          where: {
            id: id,
          },
        },
      );
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        GroupOwnerCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
