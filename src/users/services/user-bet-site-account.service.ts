import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  UserBetSiteAccountDTO,
  UserBetSiteAccountQueryDTO,
} from '@src/users/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class UsersUserBetSiteAccountService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(
    createBetSiteUserAccountDTO,
  ): Promise<ApiResponseDTO<UserBetSiteAccountDTO>> {
    try {
      const createdBetTypeSportsType =
        await this.prismaService.usersUserBetSiteAccount.create({
          data: {
            ...createBetSiteUserAccountDTO,
          },
        });

      return {
        status: 'success',
        data: new UserBetSiteAccountDTO(createdBetTypeSportsType),
        message: 'The Bet Site User Account has been successfully created.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        UsersUserBetSiteAccountService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findByCriteria(query: UserBetSiteAccountQueryDTO): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    const filters = {
      status: query.status,
      betSiteAccountId: query.betSiteAccountId,
      userId: query.userId,
      betSiteAccount: {
        betSiteId: query.betSiteId,
      },
    };

    try {
      const totalCount = await this.prismaService.usersUserBetSiteAccount.count(
        {
          where: filters,
        },
      );
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const betSiteUserAccounts = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUserBetSiteAccount.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            include: {
              betSiteAccount: true,
            },
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(
          UserBetSiteAccountDTO,
          JSON.parse(betSiteUserAccounts),
        ),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
        message: 'Records has been retrieve successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        UsersUserBetSiteAccountService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<UserBetSiteAccountDTO>> {
    try {
      const betSiteUserAccount = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUserBetSiteAccount.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(betSiteUserAccount) === null) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          UserBetSiteAccountDTO,
          JSON.parse(betSiteUserAccount),
        ),
        message: 'Record has been retrieve successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        UsersUserBetSiteAccountService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    updateBetSiteUserAccountDTO: object,
  ): Promise<ApiResponseDTO<UserBetSiteAccountDTO>> {
    try {
      const updatedBetSiteUserAccountData =
        await this.prismaService.usersUserBetSiteAccount.update({
          where: {
            id: id,
          },
          data: {
            ...updateBetSiteUserAccountDTO,
          },
        });
      return {
        status: 'success',
        data: new UserBetSiteAccountDTO(updatedBetSiteUserAccountData),
        message: 'Bet Site User Account info has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        UsersUserBetSiteAccountService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.usersUserBetSiteAccount.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        UsersUserBetSiteAccountService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
