import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  GroupOwnerGroupTypeDTO,
  GroupOwnerGroupTypeQueryDTO,
  UpdateGroupOwnerGroupTypeDTO,
} from '@src/affiliates/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class GroupOwnerGroupTypesService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createGroupOwnerGroupTypeDTO,
  ): Promise<ApiResponseDTO<GroupOwnerGroupTypeDTO>> {
    try {
      const createdGroupOwnerGroupType =
        await this.prismaService.affiliatesGroupOwnerGroupType.create({
          data: {
            ...createGroupOwnerGroupTypeDTO,
          },
        });

      return {
        status: 'success',
        data: new GroupOwnerGroupTypeDTO(createdGroupOwnerGroupType),
        message: 'The Commission Type has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        GroupOwnerGroupTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: GroupOwnerGroupTypeQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      name: query.title,
    };

    try {
      const totalCount =
        await this.prismaService.affiliatesGroupOwnerGroupType.count({
          where: filters,
        });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const groupOwnerGroupType = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupOwnerGroupType.findMany({
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
        data: plainToInstance(
          GroupOwnerGroupTypeDTO,
          JSON.parse(groupOwnerGroupType),
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
        GroupOwnerGroupTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<GroupOwnerGroupTypeDTO>> {
    try {
      const groupOwnerGroupType = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupOwnerGroupType.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(groupOwnerGroupType) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(
          GroupOwnerGroupTypeDTO,
          JSON.parse(groupOwnerGroupType),
        ),
        message: 'Commission Type retrieve successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        GroupOwnerGroupTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    updateGroupOwnerGroupTypeDTO: UpdateGroupOwnerGroupTypeDTO,
  ): Promise<ApiResponseDTO<GroupOwnerGroupTypeDTO>> {
    try {
      const id = updateGroupOwnerGroupTypeDTO.id;
      const updatedGroupOwnerGroupTypeData =
        await this.prismaService.affiliatesGroupOwnerGroupType.update({
          where: {
            id: id,
          },
          data: {
            ...updateGroupOwnerGroupTypeDTO,
          },
        });
      return {
        status: 'success',
        data: new GroupOwnerGroupTypeDTO(updatedGroupOwnerGroupTypeData),
        message: 'Commission Type info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        GroupOwnerGroupTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateGroupOwnerGroupTypeStatusDTO: object,
  ): Promise<ApiResponseDTO<GroupOwnerGroupTypeDTO>> {
    try {
      const updatedGroupOwnerGroupTypeData =
        await this.prismaService.affiliatesGroupOwnerGroupType.update({
          where: {
            id: id,
          },
          data: {
            ...updateGroupOwnerGroupTypeStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new GroupOwnerGroupTypeDTO(updatedGroupOwnerGroupTypeData),
        message: 'Bet Site status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        GroupOwnerGroupTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.affiliatesGroupOwnerGroupType.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        GroupOwnerGroupTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
