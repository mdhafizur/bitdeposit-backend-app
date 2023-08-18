import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserMatchDTO, UserMatchQueryDTO } from '@src/users/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class UsersUserMatchesService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(createUserMatchDTO): Promise<ApiResponseDTO<UserMatchDTO>> {
    try {
      const createdSportsUserMatch =
        await this.prismaService.usersUserMatch.create({
          data: {
            ...createUserMatchDTO,
          },
        });

      return {
        status: 'success',
        data: new UserMatchDTO(createdSportsUserMatch),
        message: 'User favourite match has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Create()',
        error.stack,
        UsersUserMatchesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findByCriteria(
    query: UserMatchQueryDTO,
  ): Promise<ApiResponseDTO<UserMatchDTO>> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    const filters = {
      status: query.status,
      sportMatchId: query.sportMatchId,
      userId: query.userId,
    };

    try {
      const data = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUserMatch.findMany({
            where: filters,
            orderBy: orderByFilters,
            include: {
              user: true,
              sportMatch: {
                include: {
                  sportTeamOneInfo: true,
                  sportTeamTwoInfo: true,
                  sportLeague: true,
                },
              },
            },
          }),
        ),
      );

      if (JSON.parse(data).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(UserMatchDTO, JSON.parse(data)),
        message: 'Records retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findall()',
        error.stack,
        UsersUserMatchesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<UserMatchDTO>> {
    try {
      const data = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUserMatch.findUnique({
            where: {
              id: id,
            },
            include: {
              user: true,
              sportMatch: true,
            },
          }),
        ),
      );

      if (JSON.parse(data)) {
        return {
          status: 'success',
          data: plainToInstance(UserMatchDTO, JSON.parse(data)),
          message: 'User favourite matches retrieved successfully.',
        };
      }
      return NoDataFoundResponse;
    } catch (error) {
      this.logger.error(
        'Calling findone()',
        error.stack,
        UsersUserMatchesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    updateDTO: object,
  ): Promise<ApiResponseDTO<UserMatchDTO>> {
    try {
      const updatedSportType = await this.prismaService.usersUserMatch.update({
        where: {
          id: id,
        },
        data: {
          ...updateDTO,
        },
      });
      return {
        status: 'success',
        data: new UserMatchDTO(updatedSportType),
        message: 'User favourite matche info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        UsersUserMatchesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.usersUserMatch.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling Remove()',
        error.stack,
        UsersUserMatchesService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
