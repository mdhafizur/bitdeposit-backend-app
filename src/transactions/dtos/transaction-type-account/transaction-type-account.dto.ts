import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { UsersUserDTO } from '@src/users/dtos';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionsTransactionDTO, TransactionsTransactionTypeDTO } from '..';

export class TransactionsTransactionTypeAccountDTO {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsUUID()
  id!: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  title!: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  value!: string;

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
  transactionTypeId!: string;

  @ApiProperty({ type: () => TransactionsTransactionTypeDTO })
  @IsOptional()
  @Type(() => TransactionsTransactionTypeDTO)
  transactionType!: TransactionsTransactionTypeDTO;

  @ApiProperty({ isArray: true, type: () => UsersUserDTO })
  @IsOptional()
  @Type(() => UsersUserDTO)
  assignedToUser!: UsersUserDTO[];

  @ApiProperty({ isArray: true, type: () => TransactionsTransactionDTO })
  @IsOptional()
  @Type(() => TransactionsTransactionDTO)
  transactions!: TransactionsTransactionDTO[];

  constructor(partial: Partial<TransactionsTransactionTypeAccountDTO>) {
    Object.assign(this, partial);
  }
}
