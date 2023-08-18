import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
import { BetHistoryEnum, BetStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { Type } from 'class-transformer';

export class UserMatchBetQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Bet id.',
    type: String,
  })
  @IsOptional()
  @IsString()
  betId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Bet overall odd value',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  odds?: Prisma.Decimal = undefined;

  @ApiPropertyOptional({
    description: 'Bet stake',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  overallStake?: Prisma.Decimal = undefined;

  @ApiPropertyOptional({
    description: 'Bet winback',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  overallWinback?: Prisma.Decimal = undefined;

  @ApiPropertyOptional({
    description: 'Match bet status',
    enum: BetStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(BetStatusEnum))
  betStatus?: BetStatusEnum = undefined;

  @ApiPropertyOptional({
    description: 'Match bet status',
    enum: BetHistoryEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(BetHistoryEnum))
  betHistory?: BetHistoryEnum = undefined;

  @ApiPropertyOptional({
    description: 'User id',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Bet Slip Setting id',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  betSlipSettingId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Bet placed from date filter.',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDateString({ strict: true } as any)
  startDate?: Date = undefined;

  @ApiPropertyOptional({
    description: 'Bet placed to date filter.',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDateString({ strict: true } as any)
  endDate?: Date = undefined;
}
