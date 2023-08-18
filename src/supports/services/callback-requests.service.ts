import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  CallbackRequestDTO,
  CallbackRequestQueryDTO,
} from '@src/supports/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class CallbackRequestsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createCallbackRequestDTO,
  ): Promise<ApiResponseDTO<CallbackRequestDTO>> {
    try {
      const createdCallbackRequest =
        await this.prismaService.supportsCallbackRequest.create({
          data: {
            ...createCallbackRequestDTO,
          },
        });

      return {
        status: 'success',
        data: new CallbackRequestDTO(createdCallbackRequest),
        message: 'The Commission Group has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        CallbackRequestsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: CallbackRequestQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
    };

    try {
      const totalCount = await this.prismaService.supportsCallbackRequest.count(
        {
          where: filters,
        },
      );
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const affiliateTransaction = JSON.stringify(
        instanceToPlain(
          await this.prismaService.supportsCallbackRequest.findMany({
            orderBy: {
              createdAt: query.orderBy,
            },
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            where: filters,
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(
          CallbackRequestDTO,
          JSON.parse(affiliateTransaction),
        ),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        CallbackRequestsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<CallbackRequestDTO>> {
    try {
      const affiliateTransaction = JSON.stringify(
        instanceToPlain(
          await this.prismaService.supportsCallbackRequest.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(affiliateTransaction) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(
          CallbackRequestDTO,
          JSON.parse(affiliateTransaction),
        ),
        message: 'Commission Group retrieve successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        CallbackRequestsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateCallbackRequestDTO: object,
  ): Promise<ApiResponseDTO<CallbackRequestDTO>> {
    try {
      const updatedCallbackRequestData =
        await this.prismaService.supportsCallbackRequest.update({
          where: {
            id: id,
          },
          data: {
            ...updateCallbackRequestDTO,
          },
        });
      return {
        status: 'success',
        data: new CallbackRequestDTO(updatedCallbackRequestData),
        message: 'Commission Group info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        CallbackRequestsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateCallbackRequestStatusDTO: object,
  ): Promise<ApiResponseDTO<CallbackRequestDTO>> {
    try {
      const updatedCallbackRequestData =
        await this.prismaService.supportsCallbackRequest.update({
          where: {
            id: id,
          },
          data: {
            ...updateCallbackRequestStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new CallbackRequestDTO(updatedCallbackRequestData),
        message: 'Commission Group status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        CallbackRequestsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.supportsCallbackRequest.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        CallbackRequestsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
