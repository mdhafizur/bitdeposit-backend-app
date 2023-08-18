import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AgentsTransactionTypeEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';

import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

// import {
//   TransactionMethodDTO,
//   TransactionsTransactionTypeAccountDTO,
//   TransactionsTransactionTypeDTO,
// } from '@src/transactions/dtos';

import { BaseDTO } from '@src/core/dtos';

export class AgentTransactionDTO extends BaseDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  tranId!: string;

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

  // @ApiProperty({
  //   enum: TransactionStatusEnum,
  //   enumName: 'TransactionStatusEnum',
  // })
  // @IsDefined()
  // @IsIn(getEnumValues(TransactionStatusEnum))
  // tranStatus!: TransactionStatusEnum;

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

  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'User Id',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsDefined()
  @IsUUID()
  agentId!: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsUUID()
  transactionMethodId!: string;

  // @ApiPropertyOptional({ type: () => TransactionMethodDTO })
  // @IsOptional()
  // @Type(() => TransactionMethodDTO)
  // transactionMethod!: TransactionMethodDTO;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  transactionTypeId!: string;

  // @ApiPropertyOptional({ type: () => TransactionsTransactionTypeDTO })
  // @IsOptional()
  // @Type(() => TransactionsTransactionTypeDTO)
  // transactionType!: TransactionsTransactionTypeDTO;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  transactionTypeAccountId?: string;

  // @ApiPropertyOptional({ type: () => TransactionsTransactionTypeAccountDTO })
  // @IsOptional()
  // @Type(() => TransactionsTransactionTypeAccountDTO)
  // transactionTypeAccount?: TransactionsTransactionTypeAccountDTO;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  userTransactionAccountId?: string;

  // @ApiPropertyOptional({ type: () => UsersTransactionTypeUserAccountDTO })
  // @IsOptional()
  // @Type(() => UsersTransactionTypeUserAccountDTO)
  // userTransactionAccount?: UsersTransactionTypeUserAccountDTO;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  senderId?: string;

  // @ApiPropertyOptional({ type: () => UsersUserDTO })
  // @IsOptional()
  // @Type(() => UsersUserDTO)
  // sender?: UsersUserDTO;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  receiverId?: string;

  // @ApiPropertyOptional({ type: () => UsersUserDTO })
  // @IsOptional()
  // @Type(() => UsersUserDTO)
  // receiver?: UsersUserDTO;

  constructor(partial: Partial<AgentTransactionDTO>) {
    super();
    Object.assign(this, partial);
  }
}
