import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { BetSlipSettingDTO } from '@src/bets/dtos';
import { FieldStatusEnum } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class BetSlipSettingsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(
    createBetSlipSettingDTO,
  ): Promise<ApiResponseDTO<BetSlipSettingDTO>> {
    try {
      const createdBetSlipSetting =
        await this.prismaService.betsBetSlipSetting.create({
          data: {
            ...createBetSlipSettingDTO,
          },
        });

      return {
        status: 'success',
        data: new BetSlipSettingDTO(createdBetSlipSetting),
        message: 'Bet Slip Setting has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        BetSlipSettingsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all--------
  async findAll(): Promise<ApiResponseDTO<BetSlipSettingDTO>> {
    try {
      const betSlipSettings = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetSlipSetting.findMany({
            where: {
              status: FieldStatusEnum.ACTIVE,
            },
            include: {
              userMatchBets: true,
            },
          }),
        ),
      );

      if (JSON.parse(betSlipSettings).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(BetSlipSettingDTO, JSON.parse(betSlipSettings)),
        message: 'Bet Slip Settings have been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAll()',
        error.stack,
        BetSlipSettingsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<BetSlipSettingDTO>> {
    try {
      const betSlipSetting = JSON.stringify(
        instanceToPlain(
          await this.prismaService.betsBetSlipSetting.findUnique({
            where: {
              id: id,
            },
            include: {
              userMatchBets: true,
            },
          }),
        ),
      );

      if (JSON.parse(betSlipSetting) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(BetSlipSettingDTO, JSON.parse(betSlipSetting)),
        message: 'Bet Slip Setting has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        BetSlipSettingsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateBetSlipSettingDTO: object,
  ): Promise<ApiResponseDTO<BetSlipSettingDTO>> {
    try {
      const updatedBettingTypeData =
        await this.prismaService.betsBetSlipSetting.update({
          where: {
            id: id,
          },
          data: {
            ...updateBetSlipSettingDTO,
          },
        });
      return {
        status: 'success',
        data: new BetSlipSettingDTO(updatedBettingTypeData),
        message: 'Bet slip setting has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        BetSlipSettingsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.betsBetSlipSetting.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        BetSlipSettingsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
