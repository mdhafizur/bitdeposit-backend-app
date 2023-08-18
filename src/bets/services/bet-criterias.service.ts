import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { BetCriteriaDTO } from '@src/bets/dtos';
import { FieldStatusEnum } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class BetCriteriasService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create
  async create(betCriteriaDTO): Promise<ApiResponseDTO<BetCriteriaDTO>> {
    try {
      const createdMatchCriteria =
        await this.prismaService.betsBetCriteria.create({
          data: {
            ...betCriteriaDTO,
          },
        });

      return {
        status: 'success',
        data: new BetCriteriaDTO(createdMatchCriteria),
        message: 'Bet criteria has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        BetCriteriasService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all
  async findAll(): Promise<ApiResponseDTO<BetCriteriaDTO>> {
    try {
      const criterias = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetCriteria.findMany({
            where: {
              status: FieldStatusEnum.ACTIVE,
            },
            include: {
              betConditions: true,
            },
          }),
        ),
      );

      if (JSON.parse(criterias).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(BetCriteriaDTO, JSON.parse(criterias)),
        message: 'Bet Criterias have been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAll()',
        error.stack,
        BetCriteriasService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  // find one
  async findOne(id: string): Promise<ApiResponseDTO<BetCriteriaDTO>> {
    try {
      const matchCriteriaData = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetCriteria.findUnique({
            where: {
              id: id,
            },
            include: {
              betConditions: true,
            },
          }),
        ),
      );

      if (JSON.parse(matchCriteriaData) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(BetCriteriaDTO, JSON.parse(matchCriteriaData)),
        message: 'Bet Criteria has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        BetCriteriasService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update
  async update(
    id: string,
    updateCriteriaDTO: object,
  ): Promise<ApiResponseDTO<BetCriteriaDTO>> {
    try {
      const updatedCriteria = await this.prismaService.betsBetCriteria.update({
        where: {
          id: id,
        },
        data: {
          ...updateCriteriaDTO,
        },
      });
      return {
        status: 'success',
        data: new BetCriteriaDTO(updatedCriteria),
        message: 'Bet criteria details has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        BetCriteriasService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.betsBetCriteria.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        BetCriteriasService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
