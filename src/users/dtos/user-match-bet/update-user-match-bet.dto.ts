import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BetHistoryEnum,
  BetStatusEnum,
  FieldStatusEnum,
  Prisma,
} from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { UpdateUsersAssociatedBetDTO } from '../associated-bet';

export class UpdateUserMatchBetDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiPropertyOptional({
    description: 'Bet odd value',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  odds?: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Bet overallStake',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  overallStake?: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Bet overallWinback',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  overallWinback?: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Details of system bet e.g. totalCount and totalWin',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  systemBet?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Match bet status',
    enum: BetStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(BetStatusEnum))
  betStatus?: BetStatusEnum;

  @ApiPropertyOptional({
    description: 'Match bet history',
    enum: BetHistoryEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(BetHistoryEnum))
  betHistory?: BetHistoryEnum;

  @ApiPropertyOptional({
    description: 'Status',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Details of match betting can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'User ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Bet Slip Setting ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  betSlipSettingId?: string;

  @ApiProperty({ type: () => UpdateUsersAssociatedBetDTO, isArray: true })
  @IsOptional()
  @IsArray()
  @Type(() => UpdateUsersAssociatedBetDTO)
  associatedBets!: UpdateUsersAssociatedBetDTO[];

  @ApiPropertyOptional({
    description: 'Updated by ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateUserMatchBetDTO>) {
    Object.assign(this, partial);
  }
}
