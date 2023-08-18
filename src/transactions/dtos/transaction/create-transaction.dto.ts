import {
  Prisma,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { getEnumValues } from '@src/core/helpers';

export class CreateTransactionsTransactionDTO {
  @IsString()
  tranId: string = 'B' + new Date().getTime();

  @ApiPropertyOptional({
    description: 'Transaction reference id',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  tranRefId?: string;

  @ApiProperty({
    description: 'Type of transaction',
    enum: TransactionTypeEnum,
    required: true,
  })
  @IsEnum(TransactionTypeEnum, {
    message: 'Transaction type is not valid',
  })
  tranType!: TransactionTypeEnum;

  @ApiProperty({
    enum: TransactionStatusEnum,
    enumName: 'TransactionStatusEnum',
  })
  @IsOptional()
  @IsIn(getEnumValues(TransactionStatusEnum))
  tranStatus?: TransactionStatusEnum = TransactionStatusEnum.PENDING;

  @ApiProperty({
    description: 'Transaction amount',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  amount!: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Transaction coin',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  coin?: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Details of transaction can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'User who created the record.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  createdById?: string;

  @ApiPropertyOptional({
    description: 'User Id',
    type: String,
    format: 'uuid',
    required: true,
  })
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
  agentId?: string;

  @ApiPropertyOptional({
    description: 'Agent transaction id.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsOptional()
  @IsUUID()
  agentTransactionId?: string;

  @ApiPropertyOptional({
    description: 'Betting site Id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  betSiteUserAccountId?: string;

  @ApiPropertyOptional({
    description: 'Transaction Method Id.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  transactionMethodId?: string;

  @ApiPropertyOptional({
    description: 'Transaction Type Id.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  transactionTypeId?: string;

  @ApiPropertyOptional({
    description: 'Transcation Type Account Id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  transactionTypeAccountId?: string;

  @ApiPropertyOptional({
    description: 'User Transcation Account Id.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userTransactionAccountId?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'User who is sending the TRANSFER transaction amount.',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  senderId?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description:
      'User who is going to receive the TRANSFER transaction amount.',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  receiverId?: string;

  constructor(partial: Partial<CreateTransactionsTransactionDTO>) {
    Object.assign(this, partial);
  }
}
