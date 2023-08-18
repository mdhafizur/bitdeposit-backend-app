import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionStatusEnum, TransactionTypeEnum } from '@prisma/client';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
import { Transform, Type } from 'class-transformer';

export class TransactionsQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Transaction Bit Deposit id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  tranId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Transaction amount.',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  amount?: number = undefined;

  @ApiPropertyOptional({
    description: 'id of an user',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userId?: string = undefined;

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
    description: 'Agent transaction id.',
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
  betSiteUserAccountId?: string = undefined;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  transactionMethodId?: string = undefined;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  transactionTypeId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Type of transactions.',
    enum: TransactionTypeEnum,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  tranType?: TransactionTypeEnum[] = undefined;

  @ApiPropertyOptional({
    description: 'Status of transactions',
    enum: TransactionStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(TransactionStatusEnum, {
    message: 'Transaction status is not valid',
  })
  tranStatus?: TransactionStatusEnum = undefined;

  @ApiPropertyOptional({
    description: 'Transaction reference id',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  tranRefId?: string = undefined;

  @ApiProperty({
    description: 'Transaction account id.',
    type: String,
    required: false,
  })
  @IsOptional()
  tranAccountId: string = undefined;

  @ApiPropertyOptional({
    description: 'sender user id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  senderId: string = undefined;

  @ApiPropertyOptional({
    description: 'received user id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  receiverId: string = undefined;

  @ApiPropertyOptional({
    description: 'Transaction from date filter.',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDateString({ strict: true } as any)
  startDate?: Date = undefined;

  @ApiPropertyOptional({
    description: 'Transaction from date filter.',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDateString({ strict: true } as any)
  endDate?: Date = undefined;
}
