import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  GroupOwnerAffiliateDTO,
  GroupOwnerAffiliateQueryDTO,
  UpdateGroupOwnerAffiliateDTO,
} from '@src/affiliates/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class GroupOwnerAffiliateService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createGroupOwnerAffiliateDTO,
  ): Promise<ApiResponseDTO<GroupOwnerAffiliateDTO>> {
    try {
      const createdGroupOwnerAffiliate =
        await this.prismaService.affiliatesGroupOwnerAffiliate.create({
          data: {
            ...createGroupOwnerAffiliateDTO,
          },
        });

      return {
        status: 'success',
        data: new GroupOwnerAffiliateDTO(createdGroupOwnerAffiliate),
        message: 'Record has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        GroupOwnerAffiliateService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: GroupOwnerAffiliateQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      groupOwnerId: query.groupOwnerId,
      affiliateId: query.affiliateId,
    };

    try {
      const totalCount =
        await this.prismaService.affiliatesGroupOwnerAffiliate.count({
          where: filters,
        });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const groupOwnerAffiliate = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupOwnerAffiliate.findMany({
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
          GroupOwnerAffiliateDTO,
          JSON.parse(groupOwnerAffiliate),
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
        GroupOwnerAffiliateService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<GroupOwnerAffiliateDTO>> {
    try {
      const groupOwnerAffiliate = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesGroupOwnerAffiliate.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(groupOwnerAffiliate) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(
          GroupOwnerAffiliateDTO,
          JSON.parse(groupOwnerAffiliate),
        ),
        message: 'Record retrieve successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        GroupOwnerAffiliateService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    updateGroupOwnerAffiliateDTO: UpdateGroupOwnerAffiliateDTO,
  ): Promise<ApiResponseDTO<GroupOwnerAffiliateDTO>> {
    try {
      const id = updateGroupOwnerAffiliateDTO.id;
      const updatedGroupOwnerAffiliateData =
        await this.prismaService.affiliatesGroupOwnerAffiliate.update({
          where: {
            id: id,
          },
          data: {
            ...updateGroupOwnerAffiliateDTO,
          },
        });
      return {
        status: 'success',
        data: new GroupOwnerAffiliateDTO(updatedGroupOwnerAffiliateData),
        message: 'Record info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        GroupOwnerAffiliateService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateGroupOwnerAffiliateStatusDTO: object,
  ): Promise<ApiResponseDTO<GroupOwnerAffiliateDTO>> {
    try {
      const updatedGroupOwnerAffiliateData =
        await this.prismaService.affiliatesGroupOwnerAffiliate.update({
          where: {
            id: id,
          },
          data: {
            ...updateGroupOwnerAffiliateStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new GroupOwnerAffiliateDTO(updatedGroupOwnerAffiliateData),
        message: 'Bet Site status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        GroupOwnerAffiliateService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.affiliatesGroupOwnerAffiliate.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        GroupOwnerAffiliateService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
