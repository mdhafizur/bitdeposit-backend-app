import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  AffiliateTransactionDTO,
  AffiliateTransactionQueryDTO,
  UpdateAffiliateTransactionDTO,
} from '@src/affiliates/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class AffiliateTransactionsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(createAffiliateTransactionDTO): Promise<ApiResponseDTO<any>> {
    try {
      console.log(createAffiliateTransactionDTO);
      // using createAffiliateTransactionDTO.transactionId find the createdById
      const transactionData =
        await this.prismaService.transactionsTransaction.findUnique({
          where: {
            id: createAffiliateTransactionDTO.transactionId,
          },
          include: {
            user: true,
          },
        });

      const transactionAmount: any = transactionData.amount;
      const payable = transactionAmount;
      const paidOut = false;

      let primaryUserId = '';
      let primaryPayablePercentage: any;
      let primaryPayable: any;
      const primaryPayableStatus = false;

      let level1UserId = '';
      let level1PayablePercentage: any;
      let level1Payable: any;
      const level1PayableStatus = false;

      let level2UserId = '';
      let level2PayablePercentage: any;
      let level2Payable: any;
      const level2PayableStatus = false;

      // find lvl wise ownerId,percentage and payble
      const ownerfind = (owner: any) => {
        if (owner.groupOwner.authGroupOwnerGroupType.title === 'LEVEL2') {
          level2UserId = owner.groupOwnerId;
          level2PayablePercentage =
            owner.groupOwner.commissionPercentage.bdPercentage;
          level2Payable = (transactionAmount * level2PayablePercentage) / 100;

          console.log('level2userId', level2UserId);
          console.log('level2PayablePercentage ', level2PayablePercentage);
          console.log('level2userId payable', level2Payable);
        } else if (
          owner.groupOwner.authGroupOwnerGroupType.title === 'LEVEL1'
        ) {
          level1UserId = owner.groupOwnerId;
          level1PayablePercentage =
            owner.groupOwner.commissionPercentage.bdPercentage -
            level2PayablePercentage;
          level1Payable = (transactionAmount * level1PayablePercentage) / 100;

          console.log('level1userId', level1UserId);
          console.log('level1PayablePercentage ', level1PayablePercentage);
          console.log('level1userId payable', level1Payable);
        } else {
          primaryUserId = owner.groupOwnerId;
          primaryPayablePercentage =
            owner.groupOwner.commissionPercentage.bdPercentage -
            level1PayablePercentage -
            level2PayablePercentage;
          primaryPayable = (transactionAmount * primaryPayablePercentage) / 100;

          console.log('primaryuserId', primaryUserId);
          console.log('primaryPayablePercentage ', primaryPayablePercentage);
          console.log('primaryuserId payable ', primaryPayable);
        }
      };

      // using createdById search affiliatesGroupOwnerUser as affiliateId to find the owner of that affiliateId
      const owner = await this.prismaService.affiliatesGroupOwnerUser.findFirst(
        {
          where: {
            userId: transactionData.createdById,
          },
          include: {
            groupOwner: {
              include: {
                group: true,
                authGroupOwnerGroupType: true,
                owner: true,
                commissionPercentage: true,
              },
            },
          },
        },
      );

      // look for group owner's owner
      const owner1 =
        await this.prismaService.affiliatesGroupOwnerAffiliate.findFirst({
          where: {
            affiliateId: owner.groupOwnerId,
          },
          include: {
            groupOwner: {
              include: {
                group: true,
                authGroupOwnerGroupType: true,
                owner: true,
                commissionPercentage: true,
              },
            },
          },
        });

      ownerfind(owner);
      // look for more owner
      if (owner1.groupOwnerId) {
        const owner2 =
          await this.prismaService.affiliatesGroupOwnerAffiliate.findFirst({
            where: {
              affiliateId: owner1.groupOwnerId,
            },
            include: {
              groupOwner: {
                include: {
                  group: true,
                  authGroupOwnerGroupType: true,
                  owner: true,
                  commissionPercentage: true,
                },
              },
            },
          });

        ownerfind(owner1);

        if (owner2.groupOwnerId) {
          // look for more owner
          const owner3 =
            await this.prismaService.affiliatesGroupOwnerAffiliate.findFirst({
              where: {
                affiliateId: owner2.groupOwnerId,
              },
              include: {
                groupOwner: {
                  include: {
                    group: true,
                    authGroupOwnerGroupType: true,
                    owner: true,
                    commissionPercentage: true,
                  },
                },
              },
            });

          ownerfind(owner3);
        }
      }

      const createdAffiliateTransaction =
        await this.prismaService.affiliatesAffiliateTransaction.create({
          data: {
            ...createAffiliateTransactionDTO,
            amount: transactionAmount,
            payable,
            paidOut,
            level2UserId,
            level2Payable,
            level2PayableStatus,
            level1UserId,
            level1Payable,
            level1PayableStatus,
            primaryUserId,
            primaryPayable,
            primaryPayableStatus,
          },
        });

      console.log('aff transaction->', createdAffiliateTransaction);

      return {
        status: 'success',
        data: new AffiliateTransactionDTO(createdAffiliateTransaction),
        message: 'The transaction has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        AffiliateTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: AffiliateTransactionQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      transactionId: query.transactionId,
      paidOut: query.paidOut,
      primaryUserId: query.primaryUserId,
      level1UserId: query.level1UserId,
      level2UserId: query.level2UserId,
    };

    try {
      const totalCount =
        await this.prismaService.affiliatesAffiliateTransaction.count({
          where: filters,
        });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const affiliateTransaction = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesAffiliateTransaction.findMany({
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
          AffiliateTransactionDTO,
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
        AffiliateTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<AffiliateTransactionDTO>> {
    try {
      const affiliateTransaction = JSON.stringify(
        instanceToPlain(
          await this.prismaService.affiliatesAffiliateTransaction.findUnique({
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
          AffiliateTransactionDTO,
          JSON.parse(affiliateTransaction),
        ),
        message: 'Affiliate transaction retrieve successful.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        AffiliateTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    updateAffiliateTransactionDTO: UpdateAffiliateTransactionDTO,
  ): Promise<ApiResponseDTO<AffiliateTransactionDTO>> {
    try {
      const id = updateAffiliateTransactionDTO.id;
      const updatedAffiliateTransactionData =
        await this.prismaService.affiliatesAffiliateTransaction.update({
          where: {
            id: id,
          },
          data: {
            ...updateAffiliateTransactionDTO,
          },
        });
      return {
        status: 'success',
        data: new AffiliateTransactionDTO(updatedAffiliateTransactionData),
        message: 'Affiliate transaction info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        AffiliateTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateAffiliateTransactionStatusDTO: object,
  ): Promise<ApiResponseDTO<AffiliateTransactionDTO>> {
    try {
      const updatedAffiliateTransactionData =
        await this.prismaService.affiliatesAffiliateTransaction.update({
          where: {
            id: id,
          },
          data: {
            ...updateAffiliateTransactionStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new AffiliateTransactionDTO(updatedAffiliateTransactionData),
        message: 'Affiliate transaction status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        AffiliateTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.affiliatesAffiliateTransaction.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        AffiliateTransactionsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
