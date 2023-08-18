import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PrismaService } from '@src/core/services/prisma.service';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { ApiResponseDTO } from '@src/core/dtos';
import { NoDataFoundResponse } from '@src/core/constants';
import {
  AuthSessionDTO,
  AuthSessionQueryDTO,
  CreateAuthSessionDTO,
  UpdateAuthSessionDTO,
} from '../dtos';

@Injectable()
export class AuthSessionsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(createAuthSessionDTO: CreateAuthSessionDTO): Promise<any> {
    try {
      const createdAuthSession = await this.prismaService.authSession.upsert({
        where: {
          deviceId: createAuthSessionDTO.deviceId,
        },
        update: {
          ...createAuthSessionDTO,
        },
        create: {
          ...createAuthSessionDTO,
        },
      });

      return {
        status: 'success',
        data: new AuthSessionDTO(createdAuthSession),
        message: 'Record has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Create()',
        error.stack,
        AuthSessionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findByCriteria(query: AuthSessionQueryDTO): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    const filters = {
      status: query.status,
      id: query.id,
      deviceId: query.deviceId,
      userId: query.userId,
      sessionStatus: query.sessionStatus,
      ip: query.ip,
    };

    try {
      const totalCount = await this.prismaService.authSession.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      const authSessions = JSON.stringify(
        instanceToPlain(
          await this.prismaService.authSession.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
          }),
        ),
      );

      if (JSON.parse(authSessions).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(AuthSessionDTO, JSON.parse(authSessions)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findAll()',
        error.stack,
        AuthSessionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<AuthSessionDTO>> {
    try {
      const authSessions = JSON.stringify(
        instanceToPlain(
          await this.prismaService.authSession.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(authSessions)) {
        return {
          status: 'success',
          data: plainToInstance(AuthSessionDTO, JSON.parse(authSessions)),
          message: 'Record has been retrieved successfully.',
        };
      }
      return NoDataFoundResponse;
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        AuthSessionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    authSessionDTO: UpdateAuthSessionDTO,
  ): Promise<ApiResponseDTO<AuthSessionDTO>> {
    try {
      const updatedSportType = await this.prismaService.authSession.update({
        where: {
          id: id,
        },
        data: {
          ...authSessionDTO,
        },
      });
      return {
        status: 'success',
        data: new AuthSessionDTO(updatedSportType),
        message: 'Record has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Update()',
        error.stack,
        AuthSessionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.authSession.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        AuthSessionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
