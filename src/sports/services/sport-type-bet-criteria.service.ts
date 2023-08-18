import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PrismaService } from '@src/core/services/prisma.service';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { ApiResponseDTO } from '@src/core/dtos';
import { NoDataFoundResponse } from '@src/core/constants';
import {
  SportTypeBetCriteriaDTO,
  SportTypeBetCriteriaQueryDTO,
} from '@src/sports/dtos';

@Injectable()
export class SportTypeBetCriteriaService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(
    sportTypeBetCriteriaDTO,
  ): Promise<ApiResponseDTO<SportTypeBetCriteriaDTO>> {
    try {
      const data = await this.prismaService.sportsSportTypeBetCriteria.create({
        data: {
          ...sportTypeBetCriteriaDTO,
        },
      });

      return {
        status: 'success',
        data: new SportTypeBetCriteriaDTO(data),
        message: 'Sport-Type-Bet-Criteria has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Create()',
        error.stack,
        SportTypeBetCriteriaService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findByCriteria(query: SportTypeBetCriteriaQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      sportTypeId: query.sportTypeId,
    };

    try {
      const totalCount =
        await this.prismaService.sportsSportTypeBetCriteria.count({
          where: filters,
        });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const data = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportTypeBetCriteria.findMany({
            include: {
              sportType: true,
              betCriteria: {
                include: {
                  betConditions: true,
                },
              },
            },
            where: filters,
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(SportTypeBetCriteriaDTO, JSON.parse(data)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
        message: 'Sport-Type-Bet-Criterias has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findall()',
        error.stack,
        SportTypeBetCriteriaService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<SportTypeBetCriteriaDTO>> {
    try {
      const data = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportTypeBetCriteria.findUnique({
            where: {
              id: id,
            },
            include: {
              sportType: true,
            },
          }),
        ),
      );

      if (JSON.parse(data)) {
        return {
          status: 'success',
          data: plainToInstance(SportTypeBetCriteriaDTO, JSON.parse(data)),
          message: 'Sport-Type-Bet-Criteria has been retrieved successfully.',
        };
      }
      return NoDataFoundResponse;
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        SportTypeBetCriteriaService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    sportTypeBetCriteriaDTO: object,
  ): Promise<ApiResponseDTO<SportTypeBetCriteriaDTO>> {
    try {
      const updatedSportType =
        await this.prismaService.sportsSportTypeBetCriteria.update({
          where: {
            id: id,
          },
          data: {
            ...sportTypeBetCriteriaDTO,
          },
        });
      return {
        status: 'success',
        data: new SportTypeBetCriteriaDTO(updatedSportType),
        message: 'Sport-Type-Bet-Criteria has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Update()',
        error.stack,
        SportTypeBetCriteriaService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.sportsSportTypeBetCriteria.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling Remove()',
        error.stack,
        SportTypeBetCriteriaService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
