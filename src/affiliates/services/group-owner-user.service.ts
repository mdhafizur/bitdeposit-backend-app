import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  GroupOwnerUserDTO,
  GroupOwnerUserQueryDTO,
  UpdateGroupOwnerUserDTO,
} from '@src/affiliates/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class GroupOwnerUserService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createGroupOwnerUserDTO,
  ): Promise<ApiResponseDTO<GroupOwnerUserDTO>> {
    try {
      const createdGroupOwnerUser =
        await this.prismaService.affiliatesGroupOwnerUser.create({
          data: {
            ...createGroupOwnerUserDTO,
          },
        });

      return {
        status: 'success',
        data: new GroupOwnerUserDTO(createdGroupOwnerUser),
        message: 'Record has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        GroupOwnerUserService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: GroupOwnerUserQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      groupOwnerId: query.groupOwnerId,
      userId: query.userId,
    };

    try {
      const totalCount =
        await this.prismaService.affiliatesGroupOwnerUser.count({
          where: filters,
        });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const groupOwnerUser = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupOwnerUser.findMany({
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
        data: plainToInstance(GroupOwnerUserDTO, JSON.parse(groupOwnerUser)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        GroupOwnerUserService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<GroupOwnerUserDTO>> {
    try {
      const groupOwnerUser = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupOwnerUser.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(groupOwnerUser) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(GroupOwnerUserDTO, JSON.parse(groupOwnerUser)),
        message: 'Record retrieve successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        GroupOwnerUserService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    updateGroupOwnerUserDTO: UpdateGroupOwnerUserDTO,
  ): Promise<ApiResponseDTO<GroupOwnerUserDTO>> {
    try {
      const id = updateGroupOwnerUserDTO.id;
      const updatedGroupOwnerUserData =
        await this.prismaService.affiliatesGroupOwnerUser.update({
          where: {
            id: id,
          },
          data: {
            ...updateGroupOwnerUserDTO,
          },
        });
      return {
        status: 'success',
        data: new GroupOwnerUserDTO(updatedGroupOwnerUserData),
        message: 'Record info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        GroupOwnerUserService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateGroupOwnerUserStatusDTO: object,
  ): Promise<ApiResponseDTO<GroupOwnerUserDTO>> {
    try {
      const updatedGroupOwnerUserData =
        await this.prismaService.affiliatesGroupOwnerUser.update({
          where: {
            id: id,
          },
          data: {
            ...updateGroupOwnerUserStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new GroupOwnerUserDTO(updatedGroupOwnerUserData),
        message: 'Bet Site status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        GroupOwnerUserService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.affiliatesGroupOwnerUser.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        GroupOwnerUserService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
