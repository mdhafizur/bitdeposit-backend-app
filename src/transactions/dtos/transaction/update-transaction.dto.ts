import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  FieldStatusEnum,
  Prisma,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';

import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTransactionDTO {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  tranRefId?: string;

  @ApiProperty({ enum: TransactionTypeEnum, enumName: 'TransactionTypeEnum' })
  @IsDefined()
  @IsIn(getEnumValues(TransactionTypeEnum))
  tranType!: TransactionTypeEnum;

  @ApiProperty({
    enum: TransactionStatusEnum,
    enumName: 'TransactionStatusEnum',
  })
  tranStatus: TransactionStatusEnum = TransactionStatusEnum.PENDING;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  amount!: Prisma.Decimal;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  coin?: Prisma.Decimal;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  statusChangedAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Agent Id',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsOptional()
  @IsUUID()
  agentId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Agent transaction Id',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsOptional()
  @IsUUID()
  agentTransactionId?: string = undefined;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  betSiteUserAccountId?: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  transactionMethodId!: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsInt()
  transactionTypeId!: string;

  @ApiPropertyOptional({
    description: 'Transcation Type Account Id.',
    type: String,
  })
  @IsOptional()
  @IsUUID()
  transactionTypeAccountId?: string;

  @ApiProperty({
    description: 'User Transcation Account Id.',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userTransactionAccountId?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  senderId?: string;

  @ApiPropertyOptional({ type: String, required: false })
  @IsOptional()
  @IsUUID()
  receiverId?: string;

  constructor(partial: Partial<UpdateTransactionDTO>) {
    Object.assign(this, partial);
  }
}
