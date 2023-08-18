// https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#postgresql-typecasting-fixes

import { ApiResponseDTO } from '../../core/dtos/api-response.dto';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services';
import {
  CreateTransactionsTransactionDTO,
  TransactionsQueryDTO,
  TransactionsTransactionDTO,
  UpdateTransactionDTO,
} from '../dtos';

import { instanceToPlain, plainToInstance } from 'class-transformer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';
import {
  AgentsTransactionTypeEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '@prisma/client';
import { CreateAgentTransactionDTO } from '@src/agents/dtos';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(
    createTransactionDTO: CreateTransactionsTransactionDTO,
  ): Promise<ApiResponseDTO<any>> {
    const transactionDetails: any[] = await this.prismaService.$queryRaw`
    SELECT 
      "ApprovedTransactions"."tranType", 
      "ApprovedTransactions"."tranStatus",
      SUM(
        CASE WHEN ("ApprovedTransactions"."tranType" ='TRANSFER' and "ApprovedTransactions"."senderId" = ${createTransactionDTO.createdById}::uuid)
        THEN "ApprovedTransactions".amount END) 
        "sentAmount",
      SUM(
        CASE WHEN ("ApprovedTransactions"."tranType" ='TRANSFER' and "ApprovedTransactions"."receiverId" = ${createTransactionDTO.createdById}::uuid)
        THEN "ApprovedTransactions".amount END) 
        "receivedAmount",
      SUM("ApprovedTransactions".amount) as "totalAmount"
    FROM (
      SELECT "amount", "tranType", "tranStatus", "senderId", "receiverId" FROM "public"."TransactionsTransaction" 
      WHERE (
        "tranStatus" = 'APPROVED' 
        AND
          (
          "createdById" = ${createTransactionDTO.createdById}::uuid
          OR 
          ( "senderId" = ${createTransactionDTO.createdById}::uuid OR "receiverId" = ${createTransactionDTO.createdById}::uuid)
          )
        )
      ) as "ApprovedTransactions"
    GROUP BY "ApprovedTransactions"."tranType", "ApprovedTransactions"."tranStatus"
`;

    let totalDepositAmount = 0;
    let totalWithdrawAmount = 0;
    let totalBetAmount = 0;
    let totalSentAmount = 0;
    let totalReceivedAmount = 0;
    transactionDetails.forEach((transactionDetail) => {
      if (
        [
          TransactionTypeEnum.DEPOSIT.toString(),
          TransactionTypeEnum.DEPOSIT1X.toString(),
          TransactionTypeEnum.CASHIN.toString(),
        ].includes(transactionDetail.tranType)
      ) {
        totalDepositAmount += Number(transactionDetail.totalAmount);
      }

      if (
        [
          TransactionTypeEnum.WITHDRAW.toString(),
          TransactionTypeEnum.WITHDRAW1X.toString(),
          TransactionTypeEnum.CASHOUT.toString(),
        ].includes(transactionDetail.tranType)
      ) {
        totalWithdrawAmount += Number(transactionDetail.totalAmount);
      }

      if (
        [TransactionTypeEnum.BET.toString()].includes(
          transactionDetail.tranType,
        )
      ) {
        totalBetAmount += Number(transactionDetail.totalAmount);
      }

      if (
        [TransactionTypeEnum.TRANSFER.toString()].includes(
          transactionDetail.tranType,
        )
      ) {
        totalSentAmount += Number(transactionDetail.sentAmount);
        totalReceivedAmount += Number(transactionDetail.receivedAmount);
      }
    });

    const totalCashInAmount = totalDepositAmount + totalReceivedAmount;
    const totalCashOutAmount =
      totalWithdrawAmount + totalSentAmount + totalBetAmount;
    const currentBalance = totalCashInAmount - totalCashOutAmount;

    if (
      ![
        TransactionTypeEnum.DEPOSIT.toString(),
        TransactionTypeEnum.DEPOSIT1X.toString(),
      ].includes(createTransactionDTO.tranType)
    ) {
      if (currentBalance <= 1) {
        return {
          status: 'warning',
          data: null,
          message: 'Insufficient Balance.',
        };
      }
    }

    try {
      const createAgentTransactionDTO = new CreateAgentTransactionDTO({});

      if (createTransactionDTO.tranType === TransactionTypeEnum.CASHOUT) {
        createAgentTransactionDTO.tranType = AgentsTransactionTypeEnum.CASHOUT;
        createAgentTransactionDTO.amount = createTransactionDTO.amount;
        createAgentTransactionDTO.agentId = createTransactionDTO.agentId;
        createAgentTransactionDTO.userId = createTransactionDTO.createdById;
        createAgentTransactionDTO.tranStatus = TransactionStatusEnum.APPROVED;

        const createdAgentTransaction =
          await this.prismaService.agentsTransaction.create({
            data: {
              ...createAgentTransactionDTO,
            },
          });

        if (createdAgentTransaction) {
          createTransactionDTO.tranStatus = TransactionStatusEnum.APPROVED;
          createTransactionDTO.agentTransactionId = createdAgentTransaction.id;
        }
      }

      const createdTransaction =
        await this.prismaService.transactionsTransaction.create({
          data: {
            ...createTransactionDTO,
          },
        });
      console.log(createdTransaction);
      return {
        status: 'success',
        data: new TransactionsTransactionDTO(createdTransaction),
        message: 'Record has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling Create()',
        error.stack,
        TransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findByCriteria(query: TransactionsQueryDTO): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    let filters = {
      status: query.status,
      amount: query.amount,
      userId: query.userId,
      tranStatus: query.tranStatus,
      tranId: query.tranId,
      tranRefId: query.tranRefId,
      betSiteUserAccountId: query.betSiteUserAccountId,
      transactionMethodId: query.transactionMethodId,
      transactionTypeId: query.transactionTypeId,
    };

    if (query.senderId && query.receiverId) {
      filters = {
        ...filters,
        ...{
          OR: [
            {
              senderId: {
                equals: query.senderId,
              },
            },
            {
              receiverId: {
                equals: query.receiverId,
              },
            },
          ],
        },
      };
    } else {
      if (query.senderId || query.receiverId) {
        filters = {
          ...filters,
          ...{
            senderId: query.senderId,
            receiverId: query.receiverId,
          },
        };
      }
    }

    if (query.startDate && query.endDate) {
      filters = {
        ...filters,
        ...{
          createdAt: {
            gte: query.startDate,
            lte: query.endDate,
          },
        },
      };
    }

    if (query.tranAccountId) {
      filters = {
        ...filters,
        ...{
          OR: [
            {
              transactionTypeAccount: {
                value: {
                  contains: query.tranAccountId,
                },
              },
            },
            {
              userTransactionAccount: {
                value: {
                  contains: query.tranAccountId,
                },
              },
            },
            {
              receiver: {
                userName: {
                  contains: query.tranAccountId,
                },
              },
            },
          ],
        },
      };
    }

    if (query.tranType) {
      const transTypes = query.tranType.map((type) => {
        return {
          tranType: {
            equals: type,
          },
        };
      });
      filters = {
        ...filters,
        ...{
          OR: transTypes,
        },
      };
    }

    try {
      const totalCount = await this.prismaService.transactionsTransaction.count(
        {
          where: {
            ...filters,
          },
        },
      );

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const totalPages = Math.ceil(totalCount / query.pageSize);

      const transactions = JSON.stringify(
        instanceToPlain(
          await this.prismaService.transactionsTransaction.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            include: {
              transactionMethod: true,
              transactionType: true,
              user: true,
              agent: true,
              userbetSiteAccounts: {
                include: {
                  betSiteAccount: true,
                },
              },
              transactionTypeAccount: true,
              userTransactionAccount: true,
              sender: true,
              receiver: true,
            },
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(
          TransactionsTransactionDTO,
          JSON.parse(transactions),
        ),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findByCriteria()',
        error.stack,
        TransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(
    id: string,
  ): Promise<ApiResponseDTO<TransactionsTransactionDTO>> {
    try {
      const transaction = JSON.stringify(
        instanceToPlain(
          await this.prismaService.transactionsTransaction.findUnique({
            where: {
              id: id,
            },
            include: {
              transactionMethod: true,
              transactionType: true,
              userbetSiteAccounts: true,
              user: true,
            },
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(
          TransactionsTransactionDTO,
          JSON.parse(transaction),
        ),
        message: 'Record has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        TransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    updateTransactionDTO: UpdateTransactionDTO,
  ): Promise<ApiResponseDTO<TransactionsTransactionDTO>> {
    try {
      const updatedTransaction =
        await this.prismaService.transactionsTransaction.update({
          where: {
            id: id,
          },
          data: {
            ...updateTransactionDTO,
          },
        });

      return {
        status: 'success',
        data: new TransactionsTransactionDTO(updatedTransaction),
        message: 'Record has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        TransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.transactionsTransaction.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        TransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findFavourite(senderId: string) {
    try {
      const transactions: any[] = await this.prismaService.$queryRaw`
        SELECT Transactions."receiverId", COUNT("receiverId"), json_build_object(
        'id', Users."id", 'userName', Users."userName", 'metaData', Users."metaData"
        ) as receiver
        FROM "public"."TransactionsTransaction" Transactions
        RIGHT JOIN "public"."UsersUser" Users
        ON Transactions."receiverId" = Users."id" 
        WHERE (
          "tranStatus" = 'APPROVED'
          AND
          "senderId" = ${senderId}::uuid
        )
        GROUP BY Transactions."receiverId", Users."id"
        ORDER BY count DESC
      `;

      if (transactions.length === 0) {
        return NoDataFoundResponse;
      }

      const transactionsData = JSON.stringify(transactions, (key, value) =>
        typeof value === 'bigint' ? Number(value) : value,
      );

      return {
        status: 'success',
        data: JSON.parse(transactionsData),
        message: 'Records has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findFavouriteByCriteria()',
        error.stack,
        TransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
