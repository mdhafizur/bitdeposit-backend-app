import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  CreateSportMatchBetConditionDTO,
  SportMatchBetConditionQuery,
  SportsSportMatchBetCondtionDTO,
  UpdateBetSportMatchBetCriteriaConditionDTO,
} from '@src/sports/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class SportsSportMatchBetConditionService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createSportMatchBetConditionDTO: CreateSportMatchBetConditionDTO,
  ): Promise<ApiResponseDTO<SportsSportMatchBetCondtionDTO>> {
    try {
      const createdSportMatchBetCriteriaCondition =
        await this.prismaService.sportsSportMatchBetCondition.create({
          data: {
            ...createSportMatchBetConditionDTO,
          },
        });

      return {
        status: 'success',
        data: new SportsSportMatchBetCondtionDTO(
          createdSportMatchBetCriteriaCondition,
        ),
        message:
          'SportMatch-BetCriteria-BetCondition has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        SportsSportMatchBetConditionService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all--------
  async findByCriteria(query: SportMatchBetConditionQuery): Promise<any> {
    const filters = {
      status: query.status,
      sportMatchId: query.sportMatchId,
      betConditionId: query.betConditionId,
    };

    try {
      const totalCount =
        await this.prismaService.sportsSportMatchBetCondition.count({
          where: filters,
        });

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const totalPages = Math.ceil(totalCount / query.pageSize);

      const sportMatchBetCriteriaConditions = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportMatchBetCondition.findMany({
            orderBy: {
              createdAt: query.orderBy,
            },
            where: filters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            include: {
              betCondition: {
                include: {
                  betCriterias: true,
                },
              },
            },
          }),
          // await this.prismaService.betsBetCriteriaBetCondition.findMany({
          //   where: {
          //     betCondition: {
          //       sportMatches: {
          //         every: {
          //           sportMatchId: query.sportMatchId,
          //         },
          //       },
          //     },
          //   },
          //   include: {
          //     betCriteria: true,
          //     betCondition: true,
          //   },
          // }),
        ),
      );

      if (JSON.parse(sportMatchBetCriteriaConditions).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          SportsSportMatchBetCondtionDTO,
          JSON.parse(sportMatchBetCriteriaConditions),
        ),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
        message: 'Records has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAll()',
        error.stack,
        SportsSportMatchBetConditionService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(
    id: string,
  ): Promise<ApiResponseDTO<SportsSportMatchBetCondtionDTO>> {
    try {
      const sportMatchBetCriteriaCondition = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportMatchBetCondition.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(sportMatchBetCriteriaCondition) === null) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          SportsSportMatchBetCondtionDTO,
          JSON.parse(sportMatchBetCriteriaCondition),
        ),
        message:
          'SportMatch-BetCriteria-BetCondition has been retrieve successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        SportsSportMatchBetConditionService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateSportMatchBetCriteriaConditionDTO: UpdateBetSportMatchBetCriteriaConditionDTO,
  ): Promise<ApiResponseDTO<SportsSportMatchBetCondtionDTO>> {
    try {
      const updatedBettingTypeData =
        await this.prismaService.sportsSportMatchBetCondition.update({
          where: {
            id: id,
          },
          data: {
            ...updateSportMatchBetCriteriaConditionDTO,
          },
        });
      return {
        status: 'success',
        data: new SportsSportMatchBetCondtionDTO(updatedBettingTypeData),
        message:
          'SportMatch-BetCriteria-BetCondition details has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        SportsSportMatchBetConditionService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.sportsSportMatchBetCondition.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        SportsSportMatchBetConditionService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
