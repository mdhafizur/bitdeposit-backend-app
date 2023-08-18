import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { BetTypeSportTypeDTO, BetTypeSportTypeQueryDTO } from '@src/bets/dtos';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class BetTypeSportTypeService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createBetTypeSportTypeDTO,
  ): Promise<ApiResponseDTO<BetTypeSportTypeDTO>> {
    try {
      const createdBetTypeSportsType =
        await this.prismaService.betsBetTypeSportType.create({
          data: {
            ...createBetTypeSportTypeDTO,
          },
        });

      return {
        status: 'success',
        data: new BetTypeSportTypeDTO(createdBetTypeSportsType),
        message: 'Record has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        BetTypeSportTypeService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by bettypeId
  async findByCriteria(query: BetTypeSportTypeQueryDTO): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    const filters = {
      status: query.status,
      betTypeId: query.betTypeId,
      sportTypeId: query.sportTypeId,
    };

    try {
      const totalCount = await this.prismaService.betsBetTypeSportType.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const betTypeSportTypes = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetTypeSportType.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            include: {
              sportType: {
                include: {
                  sportUIConditions: {
                    include: {
                      sportUICondition: true,
                    },
                  },
                  sportCategories: true,
                },
              },
            },
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(
          BetTypeSportTypeDTO,
          JSON.parse(betTypeSportTypes),
        ),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
        message: 'Records has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        BetTypeSportTypeService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<BetTypeSportTypeDTO>> {
    try {
      const betTypeSportType = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetTypeSportType.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(betTypeSportType) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(
          BetTypeSportTypeDTO,
          JSON.parse(betTypeSportType),
        ),
        message: 'Record has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        BetTypeSportTypeService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateBetTypeSportTypeDTO: object,
  ): Promise<ApiResponseDTO<BetTypeSportTypeDTO>> {
    try {
      const updatedBetTypeSportTypeData =
        await this.prismaService.betsBetTypeSportType.update({
          where: {
            id: id,
          },
          data: {
            ...updateBetTypeSportTypeDTO,
          },
        });
      return {
        status: 'success',
        data: new BetTypeSportTypeDTO(updatedBetTypeSportTypeData),
        message: 'Record has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        BetTypeSportTypeService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.betsBetTypeSportType.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        BetTypeSportTypeService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
