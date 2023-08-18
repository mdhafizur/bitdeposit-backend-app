import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { FieldStatusEnum } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PrismaService } from '@src/core/services/prisma.service';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { ApiResponseDTO } from '@src/core/dtos';
import { NoDataFoundResponse } from '@src/core/constants';
import { SportTypeDTO } from '@src/sports/dtos';

@Injectable()
export class SportTypesService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(sportTypeDTO): Promise<ApiResponseDTO<SportTypeDTO>> {
    try {
      const createdSportsType = await this.prismaService.sportsSportType.create(
        {
          data: {
            ...sportTypeDTO,
          },
        },
      );

      return {
        status: 'success',
        data: new SportTypeDTO(createdSportsType),
        message: 'Sport Type has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Create()',
        error.stack,
        SportTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findAll(): Promise<ApiResponseDTO<SportTypeDTO>> {
    try {
      const sportTypes = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportType.findMany({
            include: {
              sportTeams: true,
              sportCategories: true,
              betTypes: true,
              sportLeagues: true,
              sportUIConditions: {
                include: {
                  sportUICondition: true,
                },
              },
            },
            where: {
              status: FieldStatusEnum.ACTIVE,
            },
          }),
        ),
      );

      if (JSON.parse(sportTypes).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(SportTypeDTO, JSON.parse(sportTypes)),
        message: 'Sport Types have been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAll()',
        error.stack,
        SportTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<SportTypeDTO>> {
    try {
      const sportTypes = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportType.findUnique({
            where: {
              id: id,
            },
            include: {
              sportTeams: true,
              sportCategories: true,
              betTypes: true,
              sportLeagues: true,
            },
          }),
        ),
      );

      if (JSON.parse(sportTypes)) {
        return {
          status: 'success',
          data: plainToInstance(SportTypeDTO, JSON.parse(sportTypes)),
          message: 'Sport Type has been retrieved successfully.',
        };
      }
      return NoDataFoundResponse;
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        SportTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    sportTypeDTO: object,
  ): Promise<ApiResponseDTO<SportTypeDTO>> {
    try {
      const updatedSportType = await this.prismaService.sportsSportType.update({
        where: {
          id: id,
        },
        data: {
          ...sportTypeDTO,
        },
      });
      return {
        status: 'success',
        data: new SportTypeDTO(updatedSportType),
        message: 'Sport Type has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Update()',
        error.stack,
        SportTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.sportsSportType.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        SportTypesService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
