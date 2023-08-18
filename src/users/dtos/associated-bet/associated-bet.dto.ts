import { UserMatchBetDTO } from '@src/users/dtos';
import { BetConditionDTO, BetTypeDTO } from '@src/bets/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { BetHistoryEnum, BetStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { BaseDTO } from '@src/core/dtos';
import { SportMatchDTO } from '@src/sports/dtos';

export class UsersAssociatedBetDTO extends BaseDTO {
  @ApiProperty({
    description: 'Order of the bet',
    type: Number,
    required: false,
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
  @Transform(
    ({ value }) => {
      if (!value) return value;
      if (value.d[1] !== undefined)
        return Number(`${value.d[0]}.${value.d[1]}`);
      return Number(`${value.d[0]}`);
    },
    {
      toPlainOnly: true,
    },
  )
  odds!: Prisma.Decimal;

  @ApiProperty({
    description: 'Associated Bet stake value.',
    type: Number,
    required: true,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Transform(
    ({ value }) => {
      if (!value) return value;
      if (value.d[1] !== undefined)
        return Number(`${value.d[0]}.${value.d[1]}`);
      return Number(`${value.d[0]}`);
    },
    {
      toPlainOnly: true,
    },
  )
  stake!: Prisma.Decimal;

  @ApiProperty({
    description: 'Associated Bet winback value.',
    type: Number,
    required: true,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Transform(
    ({ value }) => {
      if (!value) return value;
      if (value.d[1] !== undefined)
        return Number(`${value.d[0]}.${value.d[1]}`);
      return Number(`${value.d[0]}`);
    },
    {
      toPlainOnly: true,
    },
  )
  winback!: Prisma.Decimal;

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
    description: 'Bet Type ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betTypeId!: string;

  @ApiProperty({ type: () => BetTypeDTO })
  @IsDefined()
  @Type(() => BetTypeDTO)
  betType!: BetTypeDTO;

  @ApiProperty({
    description: 'Sports Match ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportMatchId!: string;

  @ApiProperty({ type: () => SportMatchDTO })
  @IsDefined()
  @Type(() => SportMatchDTO)
  sportMatch!: SportMatchDTO;

  @ApiProperty({
    description: 'Bet condition id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betConditionId!: string;

  @ApiProperty({ type: () => BetConditionDTO })
  @IsOptional()
  @Type(() => BetConditionDTO)
  betCondition!: BetConditionDTO;

  @ApiProperty({
    description: 'Parent record id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  userMatchBetId!: string;

  @ApiProperty({ type: () => UserMatchBetDTO })
  @IsOptional()
  @Type(() => UserMatchBetDTO)
  userMatchBet!: UserMatchBetDTO;
}
