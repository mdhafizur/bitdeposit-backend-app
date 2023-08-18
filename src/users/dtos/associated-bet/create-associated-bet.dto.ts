import { ApiProperty } from '@nestjs/swagger';
import { BetHistoryEnum, BetStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { Type } from 'class-transformer';
import { IsDefined, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateUsersAssociatedBetDTO {
  @ApiProperty({
    description: 'Order of the bet',
    type: Number,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  order!: number;

  @ApiProperty({
    description: 'Associated Bet odd value.',
    type: Number,
    required: true,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  odds!: Prisma.Decimal;

  @ApiProperty({
    description: 'Associated Bet stake value.',
    type: Number,
    required: true,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  stake!: Prisma.Decimal;

  @ApiProperty({
    description: 'Match bet status.',
    enum: BetStatusEnum,
    required: true,
  })
  @IsDefined()
  @IsIn(getEnumValues(BetStatusEnum))
  betStatus!: BetStatusEnum;

  @ApiProperty({
    description: 'Match bet history.',
    enum: BetHistoryEnum,
    required: true,
  })
  @IsDefined()
  @IsIn(getEnumValues(BetHistoryEnum))
  betHistory!: BetHistoryEnum;

  @ApiProperty({
    description: 'Parent record id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  userMatchBetId!: string;

  @ApiProperty({
    description: 'Bet Type ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betTypeId!: string;

  @ApiProperty({
    description: 'Sports Match ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportMatchId!: string;

  @ApiProperty({
    description: 'Bet condition id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betConditionId!: string;

  constructor(partial: Partial<CreateUsersAssociatedBetDTO>) {
    Object.assign(this, partial);
  }
}
