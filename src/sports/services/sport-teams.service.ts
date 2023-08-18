import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { SportTeamDTO } from '@src/sports/dtos';
import { FieldStatusEnum } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class SportTeamsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(sportTeamDTO): Promise<ApiResponseDTO<SportTeamDTO>> {
    try {
      const createdSportsTeam = await this.prismaService.sportsSportTeam.create(
        {
          data: {
            ...sportTeamDTO,
          },
        },
      );

      return {
        status: 'success',
        data: new SportTeamDTO(createdSportsTeam),
        message: 'Sport Team has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Create()',
        error.stack,
        SportTeamsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findAll(): Promise<ApiResponseDTO<SportTeamDTO>> {
    try {
      const sportTeams = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportTeam.findMany({
            include: {
              sportType: true,
            },
            where: {
              status: FieldStatusEnum.ACTIVE,
            },
          }),
        ),
      );

      if (JSON.parse(sportTeams).length === 0) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(SportTeamDTO, JSON.parse(sportTeams)),
        message: 'Sport Teams have been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findall()',
        error.stack,
        SportTeamsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<SportTeamDTO>> {
    try {
      const sportTeams = JSON.stringify(
        instanceToPlain(
          await this.prismaService.sportsSportTeam.findUnique({
            where: {
              id: id,
            },
            include: {
              sportType: true,
            },
          }),
        ),
      );

      if (JSON.parse(sportTeams)) {
        return {
          status: 'success',
          data: plainToInstance(SportTeamDTO, JSON.parse(sportTeams)),
          message: 'Sport Team has been retrieved successfully.',
        };
      }
      return NoDataFoundResponse;
    } catch (error) {
      this.logger.error(
        'Calling findone()',
        error.stack,
        SportTeamsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    sportTeamDTO: object,
  ): Promise<ApiResponseDTO<SportTeamDTO>> {
    try {
      const updatedSportTeam = await this.prismaService.sportsSportTeam.update({
        where: {
          id: id,
        },
        data: {
          ...sportTeamDTO,
        },
      });
      return {
        status: 'success',
        data: new SportTeamDTO(updatedSportTeam),
        message: 'Sport Team details has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        SportTeamsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.sportsSportTeam.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        SportTeamsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
