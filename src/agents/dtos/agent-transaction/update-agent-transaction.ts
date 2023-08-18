import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  AgentsTransactionTypeEnum,
  FieldStatusEnum,
  Prisma,
  TransactionStatusEnum,
} from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';

import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAgentTransactionDTO {
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'id of agent transaction',
  })
  @IsDefined()
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  tranRefId?: string;

  @ApiProperty({
    enum: AgentsTransactionTypeEnum,
    enumName: 'AgentsTransactionTypeEnum',
  })
  @IsDefined()
  @IsIn(getEnumValues(AgentsTransactionTypeEnum))
  tranType!: AgentsTransactionTypeEnum;

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

  @ApiProperty({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  userId!: string;

  @ApiPropertyOptional({
    description: 'agent Id',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsOptional()
  @IsUUID()
  agentId!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  betSiteUserAccountId?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsUUID()
  transactionMethodId?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsUUID()
  transactionTypeId?: string;

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

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description:
      'User who is going to receive/withdraw the TRANSFER transaction amount.',
  })
  @IsUUID()
  transactionId?: string;

  constructor(partial: Partial<UpdateAgentTransactionDTO>) {
    Object.assign(this, partial);
  }
}
