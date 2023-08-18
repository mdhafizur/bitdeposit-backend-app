import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  GroupTypeCommissionStructureDTO,
  GroupTypeCommissionStructureQueryDTO,
  UpdateGroupTypeCommissionStructureDTO,
} from '@src/affiliates/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class GroupTypeCommissionStructureService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createGroupTypeCommissionStructureDTO,
  ): Promise<ApiResponseDTO<GroupTypeCommissionStructureDTO>> {
    try {
      const createdGroupTypeCommissionStructure =
        await this.prismaService.affiliatesGroupTypeCommissionStructure.create({
          data: {
            ...createGroupTypeCommissionStructureDTO,
          },
        });

      return {
        status: 'success',
        data: new GroupTypeCommissionStructureDTO(
          createdGroupTypeCommissionStructure,
        ),
        message: 'Record has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        GroupTypeCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(
    query: GroupTypeCommissionStructureQueryDTO,
  ): Promise<any> {
    const filters = {
      status: query.status,
      authGroupOwnerGroupTypeId: query.authGroupOwnerGroupTypeId,
    };

    try {
      const totalCount =
        await this.prismaService.affiliatesGroupTypeCommissionStructure.count({
          where: filters,
        });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const groupTypeCommissionStructure = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupTypeCommissionStructure.findMany(
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
          GroupTypeCommissionStructureDTO,
          JSON.parse(groupTypeCommissionStructure),
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
        GroupTypeCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(
    id: string,
  ): Promise<ApiResponseDTO<GroupTypeCommissionStructureDTO>> {
    try {
      const groupTypeCommissionStructure = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupTypeCommissionStructure.findUnique(
            {
              where: {
                id: id,
              },
            },
          ),
        ),
      );

      if (JSON.parse(groupTypeCommissionStructure) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(
          GroupTypeCommissionStructureDTO,
          JSON.parse(groupTypeCommissionStructure),
        ),
        message: 'Record retrieve successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        GroupTypeCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    updateGroupTypeCommissionStructureDTO: UpdateGroupTypeCommissionStructureDTO,
  ): Promise<ApiResponseDTO<GroupTypeCommissionStructureDTO>> {
    try {
      const id = updateGroupTypeCommissionStructureDTO.id;
      const updatedGroupTypeCommissionStructureData =
        await this.prismaService.affiliatesGroupTypeCommissionStructure.update({
          where: {
            id: id,
          },
          data: {
            ...updateGroupTypeCommissionStructureDTO,
          },
        });
      return {
        status: 'success',
        data: new GroupTypeCommissionStructureDTO(
          updatedGroupTypeCommissionStructureData,
        ),
        message: 'Record info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        GroupTypeCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateGroupTypeCommissionStructureStatusDTO: object,
  ): Promise<ApiResponseDTO<GroupTypeCommissionStructureDTO>> {
    try {
      const updatedGroupTypeCommissionStructureData =
        await this.prismaService.affiliatesGroupTypeCommissionStructure.update({
          where: {
            id: id,
          },
          data: {
            ...updateGroupTypeCommissionStructureStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new GroupTypeCommissionStructureDTO(
          updatedGroupTypeCommissionStructureData,
        ),
        message: 'Bet Site status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        GroupTypeCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.affiliatesGroupTypeCommissionStructure.delete(
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
        GroupTypeCommissionStructureService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
