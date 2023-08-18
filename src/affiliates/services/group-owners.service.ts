import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  GroupOwnerDTO,
  GroupOwnerQueryDTO,
  UpdateGroupOwnerDTO,
} from '@src/affiliates/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class GroupOwnersService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(createGroupOwnerDTO): Promise<ApiResponseDTO<GroupOwnerDTO>> {
    try {
      const createdGroupOwner =
        await this.prismaService.affiliatesGroupOwner.create({
          data: {
            ...createGroupOwnerDTO,
          },
        });

      return {
        status: 'success',
        data: new GroupOwnerDTO(createdGroupOwner),
        message: 'Record has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        GroupOwnersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: GroupOwnerQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      title: query.title,
      groupId: query.groupId,
      ownerId: query.ownerId,
      authGroupOwnerGroupTypeId: query.authGroupOwnerGroupTypeId,
    };

    try {
      const totalCount = await this.prismaService.affiliatesGroupOwner.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const groupOwner = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupOwner.findMany({
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
        data: plainToInstance(GroupOwnerDTO, JSON.parse(groupOwner)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        GroupOwnersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<GroupOwnerDTO>> {
    try {
      const groupOwner = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupOwner.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(groupOwner) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(GroupOwnerDTO, JSON.parse(groupOwner)),
        message: 'Record retrieve successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        GroupOwnersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    updateGroupOwnerDTO: UpdateGroupOwnerDTO,
  ): Promise<ApiResponseDTO<GroupOwnerDTO>> {
    try {
      const id = updateGroupOwnerDTO.id;
      const updatedGroupOwnerData =
        await this.prismaService.affiliatesGroupOwner.update({
          where: {
            id: id,
          },
          data: {
            ...updateGroupOwnerDTO,
          },
        });
      return {
        status: 'success',
        data: new GroupOwnerDTO(updatedGroupOwnerData),
        message: 'Record info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        GroupOwnersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateGroupOwnerStatusDTO: object,
  ): Promise<ApiResponseDTO<GroupOwnerDTO>> {
    try {
      const updatedGroupOwnerData =
        await this.prismaService.affiliatesGroupOwner.update({
          where: {
            id: id,
          },
          data: {
            ...updateGroupOwnerStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new GroupOwnerDTO(updatedGroupOwnerData),
        message: 'Bet Site status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        GroupOwnersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.affiliatesGroupOwner.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        GroupOwnersService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
