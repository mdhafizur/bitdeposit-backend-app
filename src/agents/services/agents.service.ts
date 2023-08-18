import { Inject, Injectable, LoggerService } from '@nestjs/common';
import {
  AgentsTransactionTypeEnum,
  Prisma,
  TransactionStatusEnum,
} from '@prisma/client';
import { NoDataFoundResponse } from '@src/core/constants';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AgentsService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService,
  ) {}

  async findUserTransactionsDetailsById(id: string) {
    let totalReceivedAmount = 0;
    let totalSentAmount = 0;
    try {
      const agentTransactions =
        await this.prismaService.agentsTransaction.groupBy({
          by: ['tranType', 'tranStatus'],
          where: {
            agentId: id,
          },
          _count: true,
          _sum: {
            amount: true,
          },
        });

      if (agentTransactions.length === 0) {
        return NoDataFoundResponse;
      }

      const totalSentTranData: any =
        await this.prismaService.agentsTransaction.aggregate({
          where: {
            AND: [
              { senderId: id },
              { tranType: AgentsTransactionTypeEnum.TRANSFER },
              { tranStatus: TransactionStatusEnum.APPROVED },
            ],
          },
          _sum: {
            amount: true,
          },
        });

      totalSentAmount = totalSentTranData._sum.amount
        ? new Prisma.Decimal(totalSentTranData._sum.amount).toNumber()
        : 0;

      const totalReceivedTranData: any =
        await this.prismaService.agentsTransaction.aggregate({
          where: {
            AND: [
              { receiverId: id },
              { tranType: AgentsTransactionTypeEnum.TRANSFER },
              { tranStatus: TransactionStatusEnum.APPROVED },
            ],
          },
          _sum: {
            amount: true,
          },
        });

      totalReceivedAmount =
        totalReceivedTranData._sum.amount !== null
          ? new Prisma.Decimal(totalReceivedTranData._sum.amount).toNumber()
          : 0;

      const tranStatus = [
        ...new Set(agentTransactions.map((tran) => tran.tranStatus)),
      ];
      const tranTypes = [
        ...new Set(agentTransactions.map((tran) => tran.tranType)),
      ];

      const transactionDetails = {};
      tranStatus.forEach((status) => {
        transactionDetails[status] = agentTransactions.filter((tran) => {
          return tran.tranStatus === status;
        });
      });

      for (const tranStatus in transactionDetails) {
        const tempData = transactionDetails[tranStatus];
        transactionDetails[tranStatus] = {};
        for (const tranType of tranTypes) {
          transactionDetails[tranStatus][tranType] = tempData.filter((data) => {
            return data.tranType === tranType;
          })[0];
        }
      }

      Object.keys(transactionDetails).forEach(function (tranStatus) {
        let totalCount = 0;
        let totalCashOutAmount = 0;
        let totalCashInAmount = 0;
        let totalBetAmount = 0;

        Object.keys(transactionDetails[tranStatus]).forEach((type) => {
          if (transactionDetails[tranStatus][type] !== undefined) {
            totalCount += transactionDetails[tranStatus][type]['_count'];

            if (tranStatus === TransactionStatusEnum.APPROVED) {
              if (
                ['WITHDRAW', 'WITHDRAW1X', 'CASHIN'].includes(
                  transactionDetails[tranStatus][type]['tranType'],
                )
              ) {
                totalCashOutAmount +=
                  transactionDetails[tranStatus][type]['_sum'][
                    'amount'
                  ].toNumber();
              }
              if (
                ['DEPOSIT', 'DEPOSIT1X', 'CASHOUT'].includes(
                  transactionDetails[tranStatus][type]['tranType'],
                )
              ) {
                totalCashInAmount +=
                  transactionDetails[tranStatus][type]['_sum'][
                    'amount'
                  ].toNumber();
              }
              if (
                ['BET'].includes(
                  transactionDetails[tranStatus][type]['tranType'],
                )
              ) {
                totalBetAmount +=
                  transactionDetails[tranStatus][type]['_sum'][
                    'amount'
                  ].toNumber();
              }
            }
          }
        });

        transactionDetails[tranStatus]['_count'] = totalCount;

        transactionDetails[tranStatus]['totalCashInAmount'] = totalCashInAmount;

        transactionDetails[tranStatus]['totalCashOutAmount'] =
          totalCashOutAmount + totalBetAmount;

        transactionDetails[tranStatus]['totalBetAmount'] = totalBetAmount;

        transactionDetails[tranStatus]['balance'] =
          totalCashInAmount - totalCashOutAmount;
      });

      if (transactionDetails['APPROVED']) {
        const approvedTotalCashInAmount =
          transactionDetails['APPROVED']['totalCashInAmount'] +
          totalReceivedAmount;

        const approvedTotalCashoutAmount =
          transactionDetails['APPROVED']['totalCashOutAmount'];

        const totalCashOutAmount = approvedTotalCashoutAmount + totalSentAmount;

        transactionDetails['APPROVED']['balance'] =
          approvedTotalCashInAmount - totalCashOutAmount;

        if (transactionDetails['APPROVED']['TRANSFER']) {
          transactionDetails['APPROVED']['TRANSFER']['totalSentAmount'] =
            totalSentAmount;
          transactionDetails['APPROVED']['TRANSFER']['totalReceivedAmount'] =
            totalReceivedAmount;
        }
      }

      return {
        status: 'success',
        data: {
          transaction: transactionDetails,
        },
        message: 'Agents transaction details retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findUserTransactionsDetailsById()',
        error.stack,
        AgentsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
