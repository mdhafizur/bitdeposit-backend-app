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
  IsUUID,
} from 'class-validator';

export class UpdateAffiliateTransactionDTO {
  @ApiProperty({
    description: 'id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiProperty({
    description: 'id of a transaction.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  transactionId!: string;

  @ApiProperty({
    description: 'Transaction amount',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  amount!: Prisma.Decimal;

  @ApiProperty({
    description: 'Payable amount',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  payable!: Prisma.Decimal;

  @ApiProperty({
    description: 'Payout Status',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  paidOut!: boolean;

  @ApiProperty({
    description: 'id of a primary user.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  primaryUserId!: string;

  @ApiProperty({
    description: 'Primary payable amount',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  primaryPayable!: Prisma.Decimal;

  @ApiProperty({
    description: 'Primary payable Status',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  primaryPayableStatus!: boolean;

  @ApiProperty({
    description: 'id of Level 1 user.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  level1UserId!: string;

  @ApiProperty({
    description: 'Level 1 payable amount',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  level1Payable!: Prisma.Decimal;

  @ApiProperty({
    description: 'Level 1 payable Status',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  level1PayableStatus!: boolean;

  @ApiProperty({
    description: 'id of level 2 user.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  level2UserId!: string;

  @ApiProperty({
    description: 'Level 2 payable amount',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  level2Payable!: Prisma.Decimal;

  @ApiProperty({
    description: 'Level 2 payable Status',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  level2PayableStatus!: boolean;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateAffiliateTransactionDTO>) {
    Object.assign(this, partial);
  }
}
