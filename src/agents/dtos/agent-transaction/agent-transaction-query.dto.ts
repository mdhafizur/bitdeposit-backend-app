import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  AgentsTransactionTypeEnum,
  TransactionStatusEnum,
} from '@prisma/client';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
import { Type } from 'class-transformer';

export class AgentTransactionQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Transaction Bit Deposit id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  tranId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Transaction tranRefId.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  tranRefId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Type of transactions.',
    enum: AgentsTransactionTypeEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(AgentsTransactionTypeEnum, {
    message: 'Transaction type is not valid.',
  })
  tranType?: AgentsTransactionTypeEnum = undefined;

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
    description: 'User Id',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsOptional()
  @IsUUID()
  agentId?: string = undefined;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  transactionMethodId?: string = undefined;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  transactionTypeId?: string = undefined;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  transactionTypeAccountId?: string = undefined;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  userTransactionAccountId?: string = undefined;

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
