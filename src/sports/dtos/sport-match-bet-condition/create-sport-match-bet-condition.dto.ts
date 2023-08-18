import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateSportMatchBetConditionDTO {
  @ApiProperty({
    description: 'Bet Condition odd value',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsPositive()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  odd!: Prisma.Decimal;

  @ApiProperty({
    description: 'Bet Condition isLocked',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  isLocked!: boolean;

  @ApiProperty({
    description: 'Bet Condition isVisible',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  isVisible!: boolean;

  @ApiProperty({
    description: 'Match ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportMatchId!: string;

  @ApiProperty({
    description: 'Bet Bet Condition ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betConditionId!: string;

  @ApiPropertyOptional({
    description: 'Details can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'SportMatch-BetCriteria status',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Created by user id',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateSportMatchBetConditionDTO>) {
    Object.assign(this, partial);
  }
}
