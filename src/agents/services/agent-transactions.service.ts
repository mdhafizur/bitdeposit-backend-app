import {
  BadRequestException,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  AgentTransactionDTO,
  AgentTransactionQueryDTO,
  CreateAgentTransactionDTO,
  UpdateAgentTransactionDTO,
} from '@src/agents/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';
import {
  AgentsTransactionTypeEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '@prisma/client';
import { CreateTransactionsTransactionDTO } from '@src/transactions/dtos';

@Injectable()
export class AgentTransactionsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async createAgentTransaction(
    createAgentTransactionDTO: CreateAgentTransactionDTO,
  ): Promise<ApiResponseDTO<any>> {
    const transactionDetails: any[] = await this.prismaService.$queryRaw`
    SELECT 
      "ApprovedTransactions"."tranType", 
      "ApprovedTransactions"."tranStatus",
      SUM(
        CASE WHEN ("ApprovedTransactions"."tranType" ='TRANSFER' and "ApprovedTransactions"."senderId" = ${createAgentTransactionDTO.createdById}::uuid)
        THEN "ApprovedTransactions".amount END) 
        "sentAmount",
      SUM(
        CASE WHEN ("ApprovedTransactions"."tranType" ='TRANSFER' and "ApprovedTransactions"."receiverId" = ${createAgentTransactionDTO.createdById}::uuid)
        THEN "ApprovedTransactions".amount END) 
        "receivedAmount",
      SUM("ApprovedTransactions".amount) as "totalAmount"
    FROM (
      SELECT "amount", "tranType", "tranStatus", "senderId", "receiverId" FROM "public"."AgentsTransaction" 
      WHERE (
        "tranStatus" = 'APPROVED' 
        AND
          (
          "createdById" = ${createAgentTransactionDTO.createdById}::uuid
          OR 
          ( "senderId" = ${createAgentTransactionDTO.createdById}::uuid OR "receiverId" = ${createAgentTransactionDTO.createdById}::uuid)
          )
        )
      ) as "ApprovedTransactions"
    GROUP BY "ApprovedTransactions"."tranType", "ApprovedTransactions"."tranStatus"
`;

    let totalDepositAmount = 0;
    let totalWithdrawAmount = 0;
    let totalSentAmount = 0;
    let totalReceivedAmount = 0;
    transactionDetails.forEach((transactionDetail) => {
      if (
        [
          AgentsTransactionTypeEnum.DEPOSIT.toString(),
          AgentsTransactionTypeEnum.CASHOUT.toString(),
        ].includes(transactionDetail.tranType)
      ) {
        totalDepositAmount += Number(transactionDetail.totalAmount);
      }

      if (
        [
          AgentsTransactionTypeEnum.WITHDRAW.toString(),
          AgentsTransactionTypeEnum.CASHIN.toString(),
        ].includes(transactionDetail.tranType)
      ) {
        totalWithdrawAmount += Number(transactionDetail.totalAmount);
      }

      if (
        [AgentsTransactionTypeEnum.TRANSFER.toString()].includes(
          transactionDetail.tranType,
        )
      ) {
        totalSentAmount += Number(transactionDetail.sentAmount);
        totalReceivedAmount += Number(transactionDetail.receivedAmount);
      }
    });

    const totalCashInAmount = totalDepositAmount + totalReceivedAmount;
    const totalCashOutAmount = totalWithdrawAmount + totalSentAmount;
    const currentBalance = totalCashInAmount - totalCashOutAmount;

    if (
      ![AgentsTransactionTypeEnum.DEPOSIT.toString()].includes(
        createAgentTransactionDTO.tranType,
      )
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
      const createUserTransactionData = new CreateTransactionsTransactionDTO(
        {},
      );
      let createdAgentTransaction;

      if (
        createAgentTransactionDTO.tranType === AgentsTransactionTypeEnum.CASHIN
      ) {
        createUserTransactionData.tranType = TransactionTypeEnum.CASHIN;
        createUserTransactionData.amount = createAgentTransactionDTO.amount;
        createUserTransactionData.agentId =
          createAgentTransactionDTO.createdById;
        createUserTransactionData.userId = createAgentTransactionDTO.userId;

        createUserTransactionData.tranStatus = TransactionStatusEnum.APPROVED;
        createAgentTransactionDTO.tranStatus = TransactionStatusEnum.APPROVED;

        createdAgentTransaction =
          await this.prismaService.agentsTransaction.create({
            data: {
              ...createAgentTransactionDTO,
              userTransaction: {
                create: {
                  ...createUserTransactionData,
                },
              },
            },
          });
      } else {
        createdAgentTransaction =
          await this.prismaService.agentsTransaction.create({
            data: {
              ...createAgentTransactionDTO,
            },
          });
      }

      console.log(createdAgentTransaction);

      return {
        status: 'success',
        data: new AgentTransactionDTO(createdAgentTransaction),
        message: 'Record has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling AgentToAgent Create()',
        error.stack,
        AgentTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findByCriteria(query: AgentTransactionQueryDTO): Promise<any> {
    let filters = {
      status: query.status,
      tranId: query.tranId,
      tranRefId: query.tranRefId,
      tranType: query.tranType,
      tranStatus: query.tranStatus,
      agentId: query.agentId,
      userId: query.userId,
      transactionMethodId: query.transactionMethodId,
      transactionTypeId: query.transactionTypeId,
      userTransactionAccountId: query.userTransactionAccountId,
      transactionTypeAccountId: query.transactionTypeAccountId,
      amount: query.amount,
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

    try {
      const totalCount = await this.prismaService.agentsTransaction.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const affiliateTransaction = JSON.stringify(
        instanceToPlain(
          await this.prismaService.agentsTransaction.findMany({
            orderBy: {
              createdAt: query.orderBy,
            },
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            include: {
              transactionMethod: true,
              transactionType: true,
              user: true,
              transactionTypeAccount: true,
              userTransactionAccount: true,
              sender: true,
              receiver: true,
            },
            where: filters,
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(
          AgentTransactionDTO,
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
        AgentTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findFavourite(senderId: string, transactionType: string) {
    try {
      let transactions: any = [];

      if (transactionType === AgentsTransactionTypeEnum.TRANSFER) {
        if (!senderId) {
          throw new BadRequestException('Kindly provide senderId');
        }
        transactions = await this.prismaService.$queryRaw`
        SELECT AgentTransactions."receiverId", COUNT("receiverId"), json_build_object(
        'id', Users."id", 'userName', Users."userName", 'metaData', Users."metaData"
        ) as receiver
        FROM "public"."AgentsTransaction" AgentTransactions
        RIGHT JOIN "public"."UsersUser" Users
        ON AgentTransactions."receiverId" = Users."id" 
        WHERE (
          "tranStatus" = 'APPROVED'
          AND
          "senderId" = ${senderId}::uuid
        )
        GROUP BY AgentTransactions."receiverId", Users."id"
        ORDER BY count DESC
      `;

        const transactionsData = JSON.stringify(transactions, (key, value) =>
          typeof value === 'bigint' ? Number(value) : value,
        );

        return {
          status: 'success',
          data: JSON.parse(transactionsData),
          message: 'Records has been retrieved successfully.',
        };
      }

      if (transactionType === AgentsTransactionTypeEnum.CASHIN) {
        transactions = (
          await this.prismaService.agentsTransaction.groupBy({
            by: ['userId'],
            where: {
              agentId: senderId,
              tranType: AgentsTransactionTypeEnum.CASHIN,
            },
            _count: true,
            _sum: {
              amount: true,
            },
          })
        ).map(async (transaction) => {
          const user = await this.prismaService.usersUser.findUnique({
            where: {
              id: transaction.userId,
            },
          });
          return {
            ...transaction,
            user: user,
          };
        });

        const data = await Promise.all(transactions);

        if (data.length === 0) {
          return NoDataFoundResponse;
        }

        return {
          status: 'success',
          data: data,
          message: 'Records has been retrieved successfully.',
        };
      }

      // const transactionsData = JSON.stringify(transactions, (key, value) =>
      //   typeof value === 'bigint' ? Number(value) : value,
      // );
    } catch (error) {
      this.logger.error(
        'Calling findFavouriteByCriteria()',
        error.stack,
        AgentTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<AgentTransactionDTO>> {
    try {
      const agentTransaction = JSON.stringify(
        instanceToPlain(
          await this.prismaService.agentsTransaction.findUnique({
            where: {
              id: id,
            },
            include: {
              transactionMethod: true,
              transactionType: true,
              user: true,
              transactionTypeAccount: true,
              userTransactionAccount: true,
              sender: true,
              receiver: true,
            },
          }),
        ),
      );

      if (JSON.parse(agentTransaction) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(
          AgentTransactionDTO,
          JSON.parse(agentTransaction),
        ),
        message: 'Record has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        AgentTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    updateAgentTransactionDTO: UpdateAgentTransactionDTO,
  ): Promise<ApiResponseDTO<AgentTransactionDTO>> {
    try {
      const id = updateAgentTransactionDTO.id;
      const updateUserTransactionData: any = {
        tranId: 'A' + new Date().getTime(),
        tranRefId: updateAgentTransactionDTO.tranRefId
          ? updateAgentTransactionDTO.tranRefId
          : undefined,
        tranStatus: updateAgentTransactionDTO.tranStatus
          ? updateAgentTransactionDTO.tranStatus
          : undefined,
        tranType: updateAgentTransactionDTO.tranType
          ? updateAgentTransactionDTO.tranType
          : undefined,
        amount: updateAgentTransactionDTO.amount,
        coin: updateAgentTransactionDTO.coin,

        metaData: updateAgentTransactionDTO.metaData,
        status: updateAgentTransactionDTO.status,
        updatedById: updateAgentTransactionDTO.updatedById,

        userId: updateAgentTransactionDTO.userId,
        transactionMethodId: updateAgentTransactionDTO.transactionMethodId
          ? updateAgentTransactionDTO.transactionMethodId
          : undefined,
        transactionTypeId: updateAgentTransactionDTO.transactionTypeId
          ? updateAgentTransactionDTO.transactionTypeId
          : undefined,
        transactionTypeAccountId:
          updateAgentTransactionDTO.transactionTypeAccountId
            ? updateAgentTransactionDTO.transactionTypeAccountId
            : undefined,
        userTransactionAccountId:
          updateAgentTransactionDTO.userTransactionAccountId
            ? updateAgentTransactionDTO.userTransactionAccountId
            : undefined,

        senderId: updateAgentTransactionDTO.senderId,
        receiverId: updateAgentTransactionDTO.receiverId,
      };

      const updateUserTransaction =
        await this.prismaService.transactionsTransaction.update({
          where: {
            id: updateAgentTransactionDTO.transactionId,
          },
          data: {
            ...updateUserTransactionData,
          },
        });

      console.log('user transaction', updateUserTransaction);

      const updatedAgentTransactionData =
        await this.prismaService.agentsTransaction.update({
          where: {
            id: id,
          },
          data: {
            ...updateAgentTransactionDTO,
          },
        });
      return {
        status: 'success',
        data: new AgentTransactionDTO(updatedAgentTransactionData),
        message: 'Agent Transaction info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        AgentTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.agentsTransaction.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        AgentTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
