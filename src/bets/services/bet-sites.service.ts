import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { BetSiteDTO, BetSiteQueryDTO } from '@src/bets/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class BetSiteService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(createBetSiteDTO): Promise<ApiResponseDTO<BetSiteDTO>> {
    try {
      const createdBetSite = await this.prismaService.betsBetSite.create({
        data: {
          ...createBetSiteDTO,
        },
      });

      return {
        status: 'success',
        data: new BetSiteDTO(createdBetSite),
        message: 'Bet Site has been created successfully.',
      };
    } catch (error) {
      this.logger.error('Calling create()', error.stack, BetSiteService.name);
      PrismaErrorHandler(error);
    }
  }

  async findByCriteria(query: BetSiteQueryDTO): Promise<any> {
    const orderByFilters: any = { [query.sortBy]: query.orderBy };

    const filters = {
      status: query.status,
      name: query.name,
      code: query.code,
    };

    try {
      const totalCount = await this.prismaService.betsBetSite.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const betSite = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetSite.findMany({
            where: filters,
            orderBy: orderByFilters,
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            include: {
              betSiteAccounts: true,
            },
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(BetSiteDTO, JSON.parse(betSite)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
        message: 'Bet Sites have been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        BetSiteService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<BetSiteDTO>> {
    try {
      const betSite = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetSite.findUnique({
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
        data: plainToInstance(BetSiteDTO, JSON.parse(betSite)),
        message: 'Bet Site has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error('Calling findOne()', error.stack, BetSiteService.name);
      PrismaErrorHandler(error);
    }
  }

  async update(
    id: string,
    updateBetSiteDTO: object,
  ): Promise<ApiResponseDTO<BetSiteDTO>> {
    try {
      const updatedBetSiteData = await this.prismaService.betsBetSite.update({
        where: {
          id: id,
        },
        data: {
          ...updateBetSiteDTO,
        },
      });
      return {
        status: 'success',
        data: new BetSiteDTO(updatedBetSiteData),
        message: 'Bet Site has been updated successfully.',
      };
    } catch (error) {
      this.logger.error('Calling update()', error.stack, BetSiteService.name);
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.betsBetSite.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error('Calling remove()', error.stack, BetSiteService.name);
      PrismaErrorHandler(error);
    }
  }
}
