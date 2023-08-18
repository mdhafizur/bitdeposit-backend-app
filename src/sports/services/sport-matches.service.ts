import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  CreateSportMatchDTO,
  SportMatchDTO,
  SportMatchQueryDTO,
} from '@src/sports/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';
import { Prisma } from '@prisma/client';

@Injectable()
export class SportMatchesService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  async create(createSportMatchDTO: CreateSportMatchDTO): Promise<any> {
    try {
      const createdSportsMatch =
        await this.prismaService.sportsSportMatch.create({
          data: {
            ...createSportMatchDTO,
          },
        });

      return {
        status: 'success',
        data: new SportMatchDTO(createdSportsMatch),
        message: 'Record has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Create()',
        error.stack,
        SportMatchesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findByCriteria(query: SportMatchQueryDTO): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    let filters: any = {
      status: query.status,
      name: {
        contains: query.name,
        mode: 'insensitive',
      },
      sportLeagueId: query.sportLeagueId,
      matchPriority: query.matchPriority,
      matchStatus: query.matchStatus,
      teamOneId: query.teamOneId,
      teamTwoId: query.teamTwoId,
    };

    if (query.betTypeId) {
      filters = {
        ...filters,
        ...{
          betTypes: {
            some: {},
            every: {
              betTypeId: query.betTypeId,
            },
          },
        },
      };
    }

    if (query.userId) {
      filters = {
        ...filters,
        ...{
          users: {
            some: {},
            every: {
              userId: query.userId,
            },
          },
        },
      };
    }

    try {
      const totalCount = await this.prismaService.sportsSportMatch.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const matchData = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportMatch.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            include: {
              betTypes: true,
              sportLeague: true,
              betConditions: true,
              sportTeamOneInfo: true,
              sportTeamTwoInfo: true,
              users: true,
              bets: true,
            },
          }),
        ),
      );

      if (JSON.parse(matchData).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(SportMatchDTO, JSON.parse(matchData)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
        message: 'Records has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findByCriteria()',
        error.stack,
        SportMatchesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<SportMatchDTO>> {
    try {
      const sportMatches = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportMatch.findUnique({
            where: {
              id: id,
            },
            include: {
              sportLeague: true,
              betConditions: true,
              bets: true,
              users: true,
              sportTeamOneInfo: true,
              sportTeamTwoInfo: true,
            },
          }),
        ),
      );

      if (JSON.parse(sportMatches)) {
        return {
          status: 'success',
          data: plainToInstance(SportMatchDTO, JSON.parse(sportMatches)),
          message: 'Sport Match has been retrieved successfully.',
        };
      }
      return NoDataFoundResponse;
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        SportMatchesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    sportMatchDTO: object,
  ): Promise<ApiResponseDTO<SportMatchDTO>> {
    try {
      const updatedSportMatch =
        await this.prismaService.sportsSportMatch.update({
          where: {
            id: id,
          },
          data: {
            ...sportMatchDTO,
          },
        });
      return {
        status: 'success',
        data: new SportMatchDTO(updatedSportMatch),
        message: 'Sport Match details has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        SportMatchesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.sportsSportMatch.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        SportMatchesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findData(sportMatchId: string): Promise<any> {
    try {
      const sportMatchBetCriteriaCondition =
        await this.prismaService.betsBetCriteria.findMany({
          where: {
            betConditions: {
              some: {
                betCondition: {
                  sportMatches: {
                    some: {
                      sportMatchId: sportMatchId,
                    },
                  },
                },
              },
            },
          },
          include: {
            betConditions: {
              include: {
                betCondition: {
                  include: {
                    sportMatches: true,
                  },
                },
              },
            },
          },
        });

      sportMatchBetCriteriaCondition.forEach((betCriteria) => {
        betCriteria.betConditions.forEach((mainCondition: any, index) => {
          const mainOddNumber = new Prisma.Decimal(
            mainCondition.betCondition.odd,
          ).toNumber();
          mainCondition.betCondition.odd = mainOddNumber;

          if (mainCondition.betCondition.sportMatches.length === 0) {
            delete betCriteria.betConditions[index];
          } else {
            const subOddNumber = new Prisma.Decimal(
              mainCondition.betCondition.sportMatches[0].odd,
            ).toNumber();
            mainCondition.betCondition.sportMatches[0].odd = subOddNumber;
            mainCondition.betCondition.matchBetCondition =
              mainCondition.betCondition.sportMatches[0];
            delete mainCondition.betCondition.sportMatches;
          }
          return betCriteria;
        });
      });

      if (sportMatchBetCriteriaCondition.length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: sportMatchBetCriteriaCondition,
        message: 'Records has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        SportMatchesService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
