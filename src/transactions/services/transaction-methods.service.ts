import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { FieldStatusEnum } from '@prisma/client';
import { NoDataFoundResponse } from '@src/core/constants';
import { ApiResponseDTO } from '@src/core/dtos';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  CreateTransactionMethodDTO,
  TransactionMethodDTO,
  UpdateTransactionMethodDTO,
} from './../dtos';

@Injectable()
export class TransactionMethodsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(
    createTransactionMethodDTO: CreateTransactionMethodDTO,
  ): Promise<ApiResponseDTO<any>> {
    try {
      const creatdeTransactionMethod =
        await this.prismaService.transactionsTransactionMethod.create({
          data: {
            ...createTransactionMethodDTO,
          },
        });
      return {
        status: 'success',
        data: new TransactionMethodDTO(creatdeTransactionMethod),
        message: 'Transaction Method has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Create()',
        error.stack,
        TransactionMethodsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findAll(): Promise<ApiResponseDTO<any>> {
    try {
      const transactionMethods = JSON.stringify(
        instanceToPlain(
          await this.prismaService.transactionsTransactionMethod.findMany({
            where: {
              status: FieldStatusEnum.ACTIVE,
            },
            include: {
              transactionTypes: {
                include: {
                  transactionAccounts: true,
                },
              },
            },
          }),
        ),
      );

      if (JSON.parse(transactionMethods).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          TransactionMethodDTO,
          JSON.parse(transactionMethods),
        ),
        message: 'Transaction Methods retrieved successfully',
      };
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string) {
    try {
      const transactionMethod = JSON.stringify(
        instanceToPlain(
          await this.prismaService.transactionsTransactionMethod.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(
          TransactionMethodDTO,
          JSON.parse(transactionMethod),
        ),
        message: 'Transaction Method retrieved successfully',
      };
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    updateTransactionMethodDTO: UpdateTransactionMethodDTO,
  ): Promise<ApiResponseDTO<any>> {
    try {
      const updatedTransactionMethod =
        await this.prismaService.transactionsTransactionMethod.update({
          where: {
            id: id,
          },
          data: {
            ...updateTransactionMethodDTO,
          },
        });

      return {
        status: 'success',
        data: new TransactionMethodDTO(updatedTransactionMethod),
        message: 'Transaction Method details has been updated successfully.',
      };
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.transactionsTransactionMethod.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }
}
