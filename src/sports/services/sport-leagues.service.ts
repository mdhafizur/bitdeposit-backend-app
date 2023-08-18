import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { SportLeagueDTO, SportLeagueQueryDTO } from '@src/sports/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class SportLeaguesService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(sportLeagueDTO): Promise<ApiResponseDTO<SportLeagueDTO>> {
    try {
      const createdSportsLeague =
        await this.prismaService.sportsSportLeague.create({
          data: {
            ...sportLeagueDTO,
          },
        });

      return {
        status: 'success',
        data: new SportLeagueDTO(createdSportsLeague),
        message: 'Sport League has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Create()',
        error.stack,
        SportLeaguesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findByCriteria(query: SportLeagueQueryDTO): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    const filters: any = {
      status: query.status,
      name: {
        contains: query.name,
        mode: 'insensitive',
      },
      sportTypeId: query.sportTypeId,
      sportCategoryId:
        query.sportCategoryId && query.sportCategoryId === 'null'
          ? null
          : query.sportCategoryId,
      leaguePriority: query.leaguePriority,
    };

    try {
      const totalCount = await this.prismaService.sportsSportLeague.count({
        where: filters,
      });

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const totalPages = Math.ceil(totalCount / query.pageSize);

      const sportLeagues = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportLeague.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(SportLeagueDTO, JSON.parse(sportLeagues)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
        message: 'Sport League have been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAll()',
        error.stack,
        SportLeaguesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<SportLeagueDTO>> {
    try {
      const sportLeagues = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportLeague.findUnique({
            where: {
              id: id,
            },
            include: {
              sportMatches: true,
              sportType: true,
              sportCategory: true,
            },
          }),
        ),
      );

      if (JSON.parse(sportLeagues)) {
        return {
          status: 'success',
          data: plainToInstance(SportLeagueDTO, JSON.parse(sportLeagues)),
          message: 'Sport League has been retrieved successfully.',
        };
      }
      return NoDataFoundResponse;
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        SportLeaguesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    sportLeagueDTO: object,
  ): Promise<ApiResponseDTO<SportLeagueDTO>> {
    try {
      const updatedSportLeague =
        await this.prismaService.sportsSportLeague.update({
          where: {
            id: id,
          },
          data: {
            ...sportLeagueDTO,
          },
        });
      return {
        status: 'success',
        data: new SportLeagueDTO(updatedSportLeague),
        message: 'Sport League details has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        SportLeaguesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.sportsSportLeague.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling Remove()',
        error.stack,
        SportLeaguesService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
