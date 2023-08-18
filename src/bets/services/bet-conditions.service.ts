import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { BetConditionDTO } from '@src/bets/dtos';
import { FieldStatusEnum } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class BetConditionsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create
  async create(betConditionDTO): Promise<ApiResponseDTO<BetConditionDTO>> {
    try {
      const createdBetCondition =
        await this.prismaService.betsBetCondition.create({
          data: {
            ...betConditionDTO,
          },
        });

      return {
        status: 'success',
        data: new BetConditionDTO(createdBetCondition),
        message: 'Bet condition has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        BetConditionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all
  async findAll(): Promise<ApiResponseDTO<BetConditionDTO>> {
    try {
      const betConditions = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetCondition.findMany({
            where: {
              status: FieldStatusEnum.ACTIVE,
            },
            include: {
              betCriterias: true,
            },
          }),
        ),
      );

      if (JSON.parse(betConditions).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(BetConditionDTO, JSON.parse(betConditions)),
        message: 'Bet Conditions have been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAll()',
        error.stack,
        BetConditionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one
  async findOne(id: string): Promise<ApiResponseDTO<BetConditionDTO>> {
    try {
      const betConditionData = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetCondition.findUnique({
            where: {
              id: id,
            },
            include: {
              betCriterias: true,
            },
          }),
        ),
      );

      if (JSON.parse(betConditionData) === null) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(BetConditionDTO, JSON.parse(betConditionData)),
        message: 'Bet Condition has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        BetConditionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update
  async update(
    id: string,
    updateConditionDTO: object,
  ): Promise<ApiResponseDTO<BetConditionDTO>> {
    try {
      const updatedCondition = await this.prismaService.betsBetCondition.update(
        {
          where: {
            id: id,
          },
          data: {
            ...updateConditionDTO,
          },
        },
      );
      return {
        status: 'success',
        data: new BetConditionDTO(updatedCondition),
        message: 'Bet condition details has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Update()',
        error.stack,
        BetConditionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.betsBetCondition.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        BetConditionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
