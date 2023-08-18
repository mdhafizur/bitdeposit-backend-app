import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { BetSiteAccountDTO, BetSiteAccountQueryDTO } from '@src/bets/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class BetSiteAccountsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(createBetSiteDTO): Promise<ApiResponseDTO<BetSiteAccountDTO>> {
    try {
      const createdBetSite = await this.prismaService.betsBetSiteAccount.create(
        {
          data: {
            ...createBetSiteDTO,
          },
        },
      );

      return {
        status: 'success',
        data: new BetSiteAccountDTO(createdBetSite),
        message: 'Bet Site Account has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        BetSiteAccountsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findByCriteria(query: BetSiteAccountQueryDTO): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    let filters = {
      status: query.status,
      accountName: query.accountName,
      accountId: query.accountId,
      betSiteId: query.betSiteId,
    };

    if (query.isAssigned != undefined) {
      filters = {
        ...filters,
        ...{ user: query.isAssigned ? { isNot: null } : null },
      };
    }

    try {
      const totalCount = await this.prismaService.betsBetSiteAccount.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const betSite = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetSiteAccount.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            include: {
              user: true,
            },
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(BetSiteAccountDTO, JSON.parse(betSite)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
        message: 'Bet Site Accounts have been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        BetSiteAccountsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<BetSiteAccountDTO>> {
    try {
      const betSite = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetSiteAccount.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(betSite) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(BetSiteAccountDTO, JSON.parse(betSite)),
        message: 'Bet Site Account has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        BetSiteAccountsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    updateBetSiteDTO: object,
  ): Promise<ApiResponseDTO<BetSiteAccountDTO>> {
    try {
      const updatedBetSiteData =
        await this.prismaService.betsBetSiteAccount.update({
          where: {
            id: id,
          },
          data: {
            ...updateBetSiteDTO,
          },
        });
      return {
        status: 'success',
        data: new BetSiteAccountDTO(updatedBetSiteData),
        message: 'Bet Site Account details has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        BetSiteAccountsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.betsBetSiteAccount.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        BetSiteAccountsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
