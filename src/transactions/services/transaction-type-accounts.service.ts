import { Injectable } from '@nestjs/common';
import { FieldStatusEnum } from '@prisma/client';
import { NoDataFoundResponse } from '@src/core/constants';
import { ApiResponseDTO } from '@src/core/dtos/api-response.dto';

import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  CreateTransactionTypeAccountDTO,
  TransactionsTransactionTypeAccountDTO,
  UpdateTransactionTypeAccountDTO,
} from '../dtos';

@Injectable()
export class TransactionTypeAccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(transactionTypeAccountDTO: CreateTransactionTypeAccountDTO) {
    try {
      const createdTransactionTypeAccount =
        await this.prismaService.transactionsTransactionTypeAccount.create({
          data: {
            ...transactionTypeAccountDTO,
          },
        });

      return {
        status: 'success',
        data: new TransactionsTransactionTypeAccountDTO(
          createdTransactionTypeAccount,
        ),
        message: 'Transaction Type Account has been created successfully.',
      };
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  async findAll(): Promise<ApiResponseDTO<any>> {
    try {
      const transationTypeAccounts = JSON.stringify(
        instanceToPlain(
          await this.prismaService.transactionsTransactionTypeAccount.findMany({
            where: {
              status: FieldStatusEnum.ACTIVE,
            },
            include: {
              transactionType: {
                include: {
                  transactionMethod: true,
                },
              },
            },
          }),
        ),
      );

      if (JSON.parse(transationTypeAccounts).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          TransactionsTransactionTypeAccountDTO,
          JSON.parse(transationTypeAccounts),
        ),
        message: 'Transaction Type Accounts retrieved successfully.',
      };
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<any>> {
    try {
      const transationTypeAccount =
        await this.prismaService.transactionsTransactionTypeAccount.findUnique({
          where: {
            id: id,
          },
          include: {
            transactionType: true,
          },
        });

      return {
        status: 'success',
        data: new TransactionsTransactionTypeAccountDTO(transationTypeAccount),
        message: 'Transaction Type Account relation retrieved successfully.',
      };
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    transactionTypeAccountDTO: UpdateTransactionTypeAccountDTO,
  ): Promise<ApiResponseDTO<any>> {
    try {
      const transactionMethodAccount =
        await this.prismaService.transactionsTransactionTypeAccount.update({
          where: {
            id: id,
          },
          data: {
            ...transactionTypeAccountDTO,
          },
        });

      return {
        status: 'success',
        data: new TransactionsTransactionTypeAccountDTO(
          transactionMethodAccount,
        ),
        message:
          'Transaction Type Account details has been updated successfully.',
      };
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.transactionsTransactionTypeAccount.delete(
        {
          where: {
            id: id,
          },
        },
      );
    } catch (error) {
      PrismaErrorHandler(error);
    }
  }
}
