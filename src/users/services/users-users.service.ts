import {
  FieldStatusEnum,
  Prisma,
  PrismaClient,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '@prisma/client';
import { ApiResponseDTO } from '../../core/dtos/api-response.dto';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import {
  UpdateUserDTO,
  UsersQueryDTO,
  UsersTransactionTypeUserAccountDTO,
  UsersUserAttachmentDTO,
  UsersUserDTO,
} from '../dtos';

import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class UsersUsersService {
  constructor(
    private readonly prismaService: PrismaClient,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async findByCriteria(query: UsersQueryDTO): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    const filters = {
      status: query.status,
      id: query.id,
      userName: query.userName,
      email: query.email,
      phone: query.phone,
    };

    try {
      const totalCount = await this.prismaService.usersUser.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      const users = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUser.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            include: {
              authSessions: true,
            },
          }),
        ),
      );
      this.logger.debug(users, UsersUsersService.name);

      if (JSON.parse(users).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(UsersUserDTO, JSON.parse(users)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling FindAll()',
        error.stack,
        UsersUsersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(updateUserData: UpdateUserDTO) {
    try {
      const updatedUser = await this.prismaService.usersUser.update({
        where: {
          id: updateUserData.id,
        },
        data: {
          ...updateUserData,
        },
      });
      return {
        status: 'success',
        data: new UpdateUserDTO(updatedUser),
        message: 'Record has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        UsersUsersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.usersUser.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        UsersUsersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findUserAttachments(id: string): Promise<ApiResponseDTO<any>> {
    try {
      const attachments = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUserAttachment.findMany({
            where: {
              userId: id,
              status: FieldStatusEnum.ACTIVE,
            },
            include: {
              user: true,
            },
          }),
        ),
      );

      if (JSON.parse(attachments).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(UsersUserAttachmentDTO, JSON.parse(attachments)),
        message: 'Users attachments retrieve successful',
      };
    } catch (error) {
      this.logger.error(
        'Calling findUserAttachments()',
        error.stack,
        UsersUsersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findUserTransactionMethodAccounts(
    id: string,
  ): Promise<ApiResponseDTO<any>> {
    try {
      const transactionTypeUserAccounts = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersTransactionTypeUserAccount.findMany({
            where: {
              userId: id,
              status: FieldStatusEnum.ACTIVE,
            },
            include: {
              transactionType: true,
              user: true,
            },
          }),
        ),
      );

      if (JSON.parse(transactionTypeUserAccounts).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          UsersTransactionTypeUserAccountDTO,
          JSON.parse(transactionTypeUserAccounts),
        ),
        message: 'Records has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findUserTransactionMethodAccounts()',
        error.stack,
        UsersUsersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findUserTransactionsDetailsById(id: string) {
    let totalReceivedAmount = 0;
    let totalSentAmount = 0;
    try {
      const userTransactions =
        await this.prismaService.transactionsTransaction.groupBy({
          by: ['tranType', 'tranStatus'],
          where: {
            userId: id,
          },
          _count: true,
          _sum: {
            amount: true,
          },
        });

      if (userTransactions.length === 0) {
        return NoDataFoundResponse;
      }

      const totalSentTranData: any =
        await this.prismaService.transactionsTransaction.aggregate({
          where: {
            AND: [
              { senderId: id },
              { tranType: TransactionTypeEnum.TRANSFER },
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
        await this.prismaService.transactionsTransaction.aggregate({
          where: {
            AND: [
              { receiverId: id },
              { tranType: TransactionTypeEnum.TRANSFER },
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
        ...new Set(userTransactions.map((tran) => tran.tranStatus)),
      ];
      const tranTypes = [
        ...new Set(userTransactions.map((tran) => tran.tranType)),
      ];

      const transactionDetails = {};
      tranStatus.forEach((status) => {
        transactionDetails[status] = userTransactions.filter((tran) => {
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

            // if (transactionDetails[tranStatus][type]['_sum']['amount']) {
            //   transactionDetails[tranStatus][type]['_sum']['amount'] =
            //     transactionDetails[tranStatus][type]['_sum'][
            //       'amount'
            //     ].toNumber();
            // }

            if (tranStatus === TransactionStatusEnum.APPROVED) {
              if (
                ['WITHDRAW', 'WITHDRAW1X'].includes(
                  transactionDetails[tranStatus][type]['tranType'],
                )
              ) {
                totalCashOutAmount +=
                  transactionDetails[tranStatus][type]['_sum'][
                    'amount'
                  ].toNumber();
              }
              if (
                ['DEPOSIT', 'DEPOSIT1X'].includes(
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
        message: 'Users transaction details retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findUserTransactionsDetailsById()',
        error.stack,
        UsersUsersService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findUserBetSiteAccounts(id: string): Promise<ApiResponseDTO<any>> {
    try {
      const userBetSiteAccounts = (
        await this.prismaService.usersUserBetSiteAccount.groupBy({
          by: ['betSiteAccountId'],
          where: {
            userId: id,
          },
        })
      ).map(async (result) => {
        const betSiteAccountData =
          await this.prismaService.betsBetSiteAccount.findUnique({
            where: { id: result.betSiteAccountId },
            include: {
              betSite: true,
            },
          });

        const accounts =
          await this.prismaService.usersUserBetSiteAccount.findMany({
            where: {
              userId: id,
              betSiteAccountId: result.betSiteAccountId,
            },
          });
        return { betSite: betSiteAccountData.betSite, accounts: accounts };
      });

      if (userBetSiteAccounts.length === 0) {
        return NoDataFoundResponse;
      }

      const data = await Promise.all(userBetSiteAccounts);

      return {
        status: 'success',
        data: data,
        message: 'Records has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findUserBetSiteAccounts()',
        error.stack,
        UsersUsersService.name,
      );
    }
  }
}
