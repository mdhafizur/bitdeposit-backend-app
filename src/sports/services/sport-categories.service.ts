import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { SportCategoryDTO } from '@src/sports/dtos';
import { FieldStatusEnum } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class SportCategoriesService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  async create(sportCategoryDTO): Promise<ApiResponseDTO<SportCategoryDTO>> {
    try {
      const createdSportsCategory =
        await this.prismaService.sportsSportCategory.create({
          data: {
            ...sportCategoryDTO,
          },
        });

      return {
        status: 'success',
        data: new SportCategoryDTO(createdSportsCategory),
        message: 'Sports Category has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        SportCategoriesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findAll(): Promise<ApiResponseDTO<SportCategoryDTO>> {
    try {
      const sportCategories = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportCategory.findMany({
            include: {
              sportType: true,
              sportLeagues: true,
            },
            where: {
              status: FieldStatusEnum.ACTIVE,
            },
          }),
        ),
      );

      if (JSON.parse(sportCategories).length !== 0) {
        return {
          status: 'success',
          data: plainToInstance(SportCategoryDTO, JSON.parse(sportCategories)),
          message: 'Sport Categories have been retrieved successfully.',
        };
      }
      return NoDataFoundResponse;
    } catch (error) {
      this.logger.error(
        'Calling findAll()',
        error.stack,
        SportCategoriesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<SportCategoryDTO>> {
    try {
      const sportCategories = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportCategory.findUnique({
            where: {
              id: id,
            },
            include: {
              sportType: true,
              sportLeagues: true,
            },
          }),
        ),
      );

      if (JSON.parse(sportCategories)) {
        return {
          status: 'success',
          data: plainToInstance(SportCategoryDTO, JSON.parse(sportCategories)),
          message: 'Sport Category has been retrieved successfully.',
        };
      }
      return NoDataFoundResponse;
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        SportCategoriesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    sportCategoryDTO: object,
  ): Promise<ApiResponseDTO<SportCategoryDTO>> {
    try {
      const updatedSportCategory =
        await this.prismaService.sportsSportCategory.update({
          where: {
            id: id,
          },
          data: {
            ...sportCategoryDTO,
          },
        });
      return {
        status: 'success',
        data: new SportCategoryDTO(updatedSportCategory),
        message: 'Sport Category details has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Update()',
        error.stack,
        SportCategoriesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.sportsSportCategory.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        SportCategoriesService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
