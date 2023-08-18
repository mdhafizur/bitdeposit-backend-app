import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  BetCriteriaBetConditionDTO,
  BetCriteriaBetConditionQueryDTO,
} from '@src/bets/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class BetCriteriaBetConditionService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createBetCriteriaBetConditionDTO,
  ): Promise<ApiResponseDTO<BetCriteriaBetConditionDTO>> {
    try {
      const createdBetCriteriaBetCondition =
        await this.prismaService.betsBetCriteriaBetCondition.create({
          data: {
            ...createBetCriteriaBetConditionDTO,
          },
        });

      return {
        status: 'success',
        data: new BetCriteriaBetConditionDTO(createdBetCriteriaBetCondition),
        message: 'Bet-Criteria-Bet-Condition has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        BetCriteriaBetConditionService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all--------
  async findByCriteria(query: BetCriteriaBetConditionQueryDTO): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    const filters = {
      status: query.status,
      betCriteriaId: query.betCriteriaId,
      betConditionId: query.betConditionId,
    };

    try {
      const totalCount =
        await this.prismaService.betsBetCriteriaBetCondition.count({
          where: filters,
        });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const betCriteriaBetConditions = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetCriteriaBetCondition.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            include: {
              betCondition: true,
            },
          }),
        ),
      );

      if (JSON.parse(betCriteriaBetConditions).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          BetCriteriaBetConditionDTO,
          JSON.parse(betCriteriaBetConditions),
        ),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
        message: 'Bet-Criteria-Bet-Condition have been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAll()',
        error.stack,
        BetCriteriaBetConditionService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(
    id: string,
  ): Promise<ApiResponseDTO<BetCriteriaBetConditionDTO>> {
    try {
      const betCriteriaBetCondition = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetCriteriaBetCondition.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(betCriteriaBetCondition) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(
          BetCriteriaBetConditionDTO,
          JSON.parse(betCriteriaBetCondition),
        ),
        message: 'Bet-Criteria-Bet-Condition has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        BetCriteriaBetConditionService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateBetCriteriaBetConditionDTO: object,
  ): Promise<ApiResponseDTO<BetCriteriaBetConditionDTO>> {
    try {
      const updatedBettingTypeData =
        await this.prismaService.betsBetCriteriaBetCondition.update({
          where: {
            id: id,
          },
          data: {
            ...updateBetCriteriaBetConditionDTO,
          },
        });
      return {
        status: 'success',
        data: new BetCriteriaBetConditionDTO(updatedBettingTypeData),
        message:
          'Bet-Criteria-Bet-Condition details has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        BetCriteriaBetConditionService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update status----------
  async updateStatus(
    id: string,
    updateBetCriteriaBetConditionStatusDTO: object,
  ): Promise<ApiResponseDTO<BetCriteriaBetConditionDTO>> {
    try {
      const updatedBettingTypeData =
        await this.prismaService.betsBetCriteriaBetCondition.update({
          where: {
            id: id,
          },
          data: {
            ...updateBetCriteriaBetConditionStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new BetCriteriaBetConditionDTO(updatedBettingTypeData),
        message:
          'Bet-Criteria-Bet-Condition status has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        BetCriteriaBetConditionService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.betsBetCriteriaBetCondition.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        BetCriteriaBetConditionService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
