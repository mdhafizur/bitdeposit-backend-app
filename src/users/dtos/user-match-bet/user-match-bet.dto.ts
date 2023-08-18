import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BetHistoryEnum,
  BetStatusEnum,
  FieldStatusEnum,
  Prisma,
} from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { BaseDTO } from '@src/core/dtos';
import { SportMatchDTO } from '@src/sports/dtos';
import { UsersAssociatedBetDTO, UsersUserDTO } from '..';

export class UserMatchBetDTO extends BaseDTO {
  @ApiProperty({
    description: 'Bet id.',
    type: String,
  })
  @IsDefined()
  @IsString()
  betId!: string;

  @ApiPropertyOptional({
    description: 'Bet overall odd value',
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

  @ApiPropertyOptional({
    description: 'Bet overallStake',
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
  overallStake!: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Bet overallWinback',
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
  overallWinback!: Prisma.Decimal;

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
    description: 'Status',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @ApiProperty({
    description: 'User id',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  userId!: string;

  @ApiProperty({ type: () => UsersUserDTO })
  @IsDefined()
  @Type(() => UsersUserDTO)
  user!: UsersUserDTO;

  @ApiProperty({
    description: 'Bet Slip Setting id',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betSlipSettingId!: string;

  @ApiProperty({ type: () => SportMatchDTO })
  @IsDefined()
  @Type(() => SportMatchDTO)
  sportMatch!: SportMatchDTO;

  @ApiProperty({ type: () => UsersAssociatedBetDTO })
  @IsDefined()
  @Type(() => UsersAssociatedBetDTO)
  associatedBets!: UsersAssociatedBetDTO;

  constructor(partial: Partial<UserMatchBetDTO>) {
    super();
    Object.assign(this, partial);
  }
}
