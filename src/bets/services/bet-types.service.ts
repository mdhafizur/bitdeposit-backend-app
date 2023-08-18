import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { BetTypeDTO, CreateBetTypeDTO } from '@src/bets/dtos';
import { FieldStatusEnum } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class BetTypesService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new
  async create(
    createBetTypeDTO: CreateBetTypeDTO,
  ): Promise<ApiResponseDTO<BetTypeDTO>> {
    try {
      const createdBettingType = await this.prismaService.betsBetType.create({
        data: {
          ...createBetTypeDTO,
        },
      });

      return {
        status: 'success',
        data: new BetTypeDTO(createdBettingType),
        message: 'Bet Type has been created successfully.',
      };
    } catch (error) {
      this.logger.error('Calling create()', error.stack, BetTypesService.name);
      PrismaErrorHandler(error);
    }
  }

  //find all--------
  async findAll(): Promise<ApiResponseDTO<BetTypeDTO>> {
    try {
      const bettingType = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetType.findMany({
            where: {
              status: FieldStatusEnum.ACTIVE,
            },
            include: {
              sportTypes: true,
              bets: true,
            },
          }),
        ),
      );

      if (JSON.parse(bettingType).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(BetTypeDTO, JSON.parse(bettingType)),
        message: 'Bet Types heve been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error('Calling findAll()', error.stack, BetTypesService.name);
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<BetTypeDTO>> {
    try {
      const bettingType = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetType.findUnique({
            where: {
              id: id,
            },
            include: {
              sportTypes: true,
              bets: true,
            },
          }),
        ),
      );

      if (JSON.parse(bettingType) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(BetTypeDTO, JSON.parse(bettingType)),
        message: 'Bet Type has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error('Calling findOne()', error.stack, BetTypesService.name);
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateBetTypeDTO: object,
  ): Promise<ApiResponseDTO<BetTypeDTO>> {
    try {
      const updatedBettingTypeData =
        await this.prismaService.betsBetType.update({
          where: {
            id: id,
          },
          data: {
            ...updateBetTypeDTO,
          },
        });
      return {
        status: 'success',
        data: new BetTypeDTO(updatedBettingTypeData),
        message: 'Bet Type details has been updated successfully.',
      };
    } catch (error) {
      this.logger.error('Calling update()', error.stack, BetTypesService.name);
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.betsBetType.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error('Calling remove()', error.stack, BetTypesService.name);
      PrismaErrorHandler(error);
    }
  }
}
