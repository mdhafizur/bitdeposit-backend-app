import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateUsersAssociatedBetDTO } from '../associated-bet';

export class CreateUserMatchBetDTO {
  @IsString()
  betId: string = 'BDB' + new Date().getTime();

  @ApiProperty({
    description: 'Bet overall odd value',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  odds?: Prisma.Decimal;

  @ApiProperty({
    description: 'Bet overallStake',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  overallStake?: Prisma.Decimal;

  @ApiProperty({
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
  @IsDefined()
  @IsUUID()
  userId!: string;

  @ApiPropertyOptional({
    description: 'Bet Slip Setting ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betSlipSettingId!: string;

  @ApiProperty({ type: () => CreateUsersAssociatedBetDTO, isArray: true })
  @IsDefined()
  @IsArray()
  @Type(() => CreateUsersAssociatedBetDTO)
  associatedBets!: CreateUsersAssociatedBetDTO[];

  @ApiPropertyOptional({
    description: 'Created by user id',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateUserMatchBetDTO>) {
    Object.assign(this, partial);
  }
}
