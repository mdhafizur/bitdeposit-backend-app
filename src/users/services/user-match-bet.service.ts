import { UpdateUserMatchBetDTO } from './../dtos/user-match-bet/update-user-match-bet.dto';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  CreateUserMatchBetDTO,
  UserMatchBetDTO,
  UserMatchBetQueryDTO,
} from '@src/users/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class UsersUserMatchBetService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(createUserMatchBetDTO: CreateUserMatchBetDTO): Promise<any> {
    const associatedBets = createUserMatchBetDTO.associatedBets;
    delete createUserMatchBetDTO.associatedBets;
    try {
      const createdMatchBet = await this.prismaService.usersUserMatchBet.create(
        {
          data: {
            ...createUserMatchBetDTO,
            associatedBets: {
              create: associatedBets,
            },
          },
        },
      );

      return {
        status: 'success',
        data: new UserMatchBetDTO(createdMatchBet),
        message: 'Record has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        UsersUserMatchBetService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findByCriteria(query: UserMatchBetQueryDTO): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    let filters = {
      status: query.status,
      odds: query.odds,
      overallStake: query.overallStake,
      overallWinback: query.overallWinback,
      betStatus: query.betStatus,
      userId: query.userId,
      betSlipSettingId: query.betSlipSettingId,
    };

    if (query.startDate && query.endDate) {
      filters = {
        ...filters,
        ...{
          createdAt: {
            gte: query.startDate,
            lte: query.endDate,
          },
        },
      };
    }

    try {
      const totalCount = await this.prismaService.usersUserMatchBet.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const bets = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUserMatchBet.findMany({
            where: filters,
            orderBy: orderByFilters,
            include: {
              user: true,
              betSlipSetting: true,
              associatedBets: {
                include: {
                  betType: true,
                  sportMatch: {
                    include: {
                      sportLeague: true,
                      sportTeamOneInfo: true,
                      sportTeamTwoInfo: true,
                    },
                  },
                  betCondition: true,
                },
              },
            },
          }),
        ),
      );

      if (JSON.parse(bets).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(UserMatchBetDTO, JSON.parse(bets)),
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
        UsersUserMatchBetService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<UserMatchBetDTO>> {
    try {
      const matchBetData = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUserMatchBet.findUnique({
            where: {
              id: id,
            },
            include: {
              user: true,
              betSlipSetting: true,
              associatedBets: {
                include: {
                  betType: true,
                  sportMatch: {
                    include: {
                      sportLeague: true,
                      sportTeamOneInfo: true,
                      sportTeamTwoInfo: true,
                    },
                  },
                  betCondition: true,
                },
              },
            },
          }),
        ),
      );

      if (JSON.parse(matchBetData) === null) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(UserMatchBetDTO, JSON.parse(matchBetData)),
        message: 'Record has been retrieved successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        UsersUserMatchBetService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(id: string, updateBetDTO: UpdateUserMatchBetDTO): Promise<any> {
    const associatedBets = updateBetDTO.associatedBets;
    delete updateBetDTO.associatedBets;

    try {
      const updatedBet = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUserMatchBet.update({
            where: {
              id: id,
            },
            data: {
              ...updateBetDTO,
              associatedBets: {
                deleteMany: {
                  id: { in: associatedBets.map((bet) => bet.id) },
                },
                createMany: { data: associatedBets },
              },
            },
            include: { associatedBets: true },
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(UserMatchBetDTO, JSON.parse(updatedBet)),
        message: 'Record has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        UsersUserMatchBetService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.usersUserMatchBet.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        UsersUserMatchBetService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
