import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  FieldStatusEnum,
  Prisma,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '@prisma/client';
import { BetSiteDTO } from '@src/bets/dtos';
import { getEnumValues } from '@src/core/helpers';
import {
  UsersTransactionTypeUserAccountDTO,
  UsersUserDTO,
} from '@src/users/dtos';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import {
  TransactionMethodDTO,
  TransactionsTransactionTypeAccountDTO,
  TransactionsTransactionTypeDTO,
} from '@src/transactions/dtos';

export class TransactionsTransactionDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  tranId!: string;

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
  @IsDefined()
  @IsIn(getEnumValues(TransactionStatusEnum))
  tranStatus!: TransactionStatusEnum;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
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

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Transform(
    ({ value }) => {
      if (!value) return value;
      if (value.d[1] !== undefined)
        return Number(`${value.d[0]}.${value.d[1]}`);
      return Number(`${value.d[0]}`);
    },
    {
      toPlainOnly: true,
    },
  )
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
  createdById?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  @ApiProperty({ type: Date })
  @IsDefined()
  @IsDate()
  createdAt!: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  userId!: string;

  @ApiPropertyOptional({
    description: 'Agent id',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsOptional()
  @IsUUID()
  agentId?: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  agentTransactionId!: string;

  @ApiProperty({ type: () => UsersUserDTO })
  @IsDefined()
  @Type(() => UsersUserDTO)
  user!: UsersUserDTO;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  betSiteUserAccountId?: string;

  @ApiPropertyOptional({ type: () => BetSiteDTO })
  @IsOptional()
  @Type(() => BetSiteDTO)
  betSiteUserAccount?: BetSiteDTO;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsUUID()
  transactionMethodId!: string;

  @ApiPropertyOptional({ type: () => TransactionMethodDTO })
  @IsOptional()
  @Type(() => TransactionMethodDTO)
  transactionMethod!: TransactionMethodDTO;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  transactionTypeId!: string;

  @ApiPropertyOptional({ type: () => TransactionsTransactionTypeDTO })
  @IsOptional()
  @Type(() => TransactionsTransactionTypeDTO)
  transactionType!: TransactionsTransactionTypeDTO;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  transactionTypeAccountId?: string;

  @ApiPropertyOptional({ type: () => TransactionsTransactionTypeAccountDTO })
  @IsOptional()
  @Type(() => TransactionsTransactionTypeAccountDTO)
  transactionTypeAccount?: TransactionsTransactionTypeAccountDTO;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  userTransactionAccountId?: string;

  @ApiPropertyOptional({ type: () => UsersTransactionTypeUserAccountDTO })
  @IsOptional()
  @Type(() => UsersTransactionTypeUserAccountDTO)
  userTransactionAccount?: UsersTransactionTypeUserAccountDTO;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  senderId?: string;

  @ApiPropertyOptional({ type: () => UsersUserDTO })
  @IsOptional()
  @Type(() => UsersUserDTO)
  sender?: UsersUserDTO;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  receiverId?: string;

  @ApiPropertyOptional({ type: () => UsersUserDTO })
  @IsOptional()
  @Type(() => UsersUserDTO)
  receiver?: UsersUserDTO;

  constructor(partial: Partial<TransactionsTransactionDTO>) {
    Object.assign(this, partial);
  }
}
