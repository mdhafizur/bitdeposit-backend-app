import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseDTO } from '@src/core/dtos';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsNumber, IsUUID } from 'class-validator';

export class AffiliateTransactionDTO extends BaseDTO {
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
  @Transform(
    ({ value }) => {
      if (value.d[1] !== undefined)
        return Number(`${value.d[0]}.${value.d[1]}`);
      return Number(`${value.d[0]}`);
    },
    {
      toPlainOnly: true,
    },
  )
  amount!: Prisma.Decimal;

  @ApiProperty({
    description: 'Payable amount',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  @Transform(
    ({ value }) => {
      if (value.d[1] !== undefined)
        return Number(`${value.d[0]}.${value.d[1]}`);
      return Number(`${value.d[0]}`);
    },
    {
      toPlainOnly: true,
    },
  )
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
  @Transform(
    ({ value }) => {
      if (value.d[1] !== undefined)
        return Number(`${value.d[0]}.${value.d[1]}`);
      return Number(`${value.d[0]}`);
    },
    {
      toPlainOnly: true,
    },
  )
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
  @Transform(
    ({ value }) => {
      if (value.d[1] !== undefined)
        return Number(`${value.d[0]}.${value.d[1]}`);
      return Number(`${value.d[0]}`);
    },
    {
      toPlainOnly: true,
    },
  )
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
  @Transform(
    ({ value }) => {
      if (value.d[1] !== undefined)
        return Number(`${value.d[0]}.${value.d[1]}`);
      return Number(`${value.d[0]}`);
    },
    {
      toPlainOnly: true,
    },
  )
  level2Payable!: Prisma.Decimal;

  @ApiProperty({
    description: 'Level 2 payable Status',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  level2PayableStatus!: boolean;

  constructor(partial: Partial<AffiliateTransactionDTO>) {
    super();
    Object.assign(this, partial);
  }
}
