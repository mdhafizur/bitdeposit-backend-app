import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  FieldStatusEnum,
  Prisma,
  TransactionsTransactionType,
} from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import {
  IsDate,
  IsDefined,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionsTransactionTypeDTO } from '..';

export class TransactionsTransactionTypeCoinRateDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  id!: string;

  @ApiProperty({ type: Number })
  @IsDefined()
  rate!: Prisma.Decimal;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  min?: Prisma.Decimal;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  max?: Prisma.Decimal;

  @ApiPropertyOptional()
  @IsOptional()
  metaData?: Prisma.JsonValue;

  @ApiProperty({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  createdById?: string;

  @ApiProperty({ type: Date })
  @IsOptional()
  @IsString()
  updatedById?: string;

  @ApiProperty({ type: Date })
  @IsDefined()
  @IsDate()
  createdAt!: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsInt()
  transactionTypeId!: number;

  @ApiProperty({ type: () => TransactionsTransactionTypeDTO })
  @IsOptional()
  transactionType!: TransactionsTransactionType;

  constructor(partial: Partial<TransactionsTransactionTypeCoinRateDTO>) {
    Object.assign(this, partial);
  }
}
