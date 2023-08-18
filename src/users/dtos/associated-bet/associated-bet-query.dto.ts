import { IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
import { BetHistoryEnum, BetStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { Type } from 'class-transformer';

export class UsersAssociatedBetQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Bet overall odd value',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  order!: number;

  @ApiPropertyOptional({
    description: 'Associated Bet odd value.',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  odds!: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Associated Bet stake value.',
    type: Number,
    required: true,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  stake!: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Associated Bet winback value.',
    type: Number,
    required: true,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  winback!: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Match bet status.',
    enum: BetStatusEnum,
    required: true,
  })
  @IsOptional()
  @IsIn(getEnumValues(BetStatusEnum))
  betStatus!: BetStatusEnum;

  @ApiPropertyOptional({
    description: 'Match bet history.',
    enum: BetHistoryEnum,
    required: true,
  })
  @IsOptional()
  @IsIn(getEnumValues(BetHistoryEnum))
  betHistory!: BetHistoryEnum;

  @ApiPropertyOptional({
    description: 'Bet Type ID',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  betTypeId!: string;

  @ApiPropertyOptional({
    description: 'Sports Match ID',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  sportMatchId?: string;

  @ApiPropertyOptional({
    description: 'Bet condition id.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  betConditionId!: string;

  @ApiPropertyOptional({
    description: 'Parent record id.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  userMatchBetId!: string;
}
