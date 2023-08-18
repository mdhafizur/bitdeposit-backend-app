import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  BetHistoryEnum,
  BetStatusEnum,
  FieldStatusEnum,
  Prisma,
} from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsObject, IsOptional, IsUUID } from 'class-validator';

export class UpdateUsersAssociatedBetDTO {
  id!: string;

  @ApiPropertyOptional({
    description: 'Order of the bet',
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
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  stake!: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Match bet status.',
    enum: BetStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(BetStatusEnum))
  betStatus!: BetStatusEnum;

  @ApiPropertyOptional({
    description: 'Match bet history.',
    enum: BetHistoryEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(BetHistoryEnum))
  betHistory!: BetHistoryEnum;

  @ApiPropertyOptional({
    description: 'Bet Type ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  betTypeId!: string;

  @ApiPropertyOptional({
    description: 'Sports Match ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  sportMatchId!: string;

  @ApiPropertyOptional({
    description: 'Bet condition id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  betConditionId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateUsersAssociatedBetDTO>) {
    Object.assign(this, partial);
  }
}
