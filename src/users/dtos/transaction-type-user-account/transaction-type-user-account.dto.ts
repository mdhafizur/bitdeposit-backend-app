import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { TransactionsTransactionTypeDTO } from '@src/transactions/dtos';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { UsersUserDTO } from '@src/users/dtos';

export class UsersTransactionTypeUserAccountDTO {
  @ApiProperty({ type: String })
  @IsDefined()
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

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  verificationCode?: number;

  @ApiProperty({ type: Boolean })
  @IsDefined()
  @IsBoolean()
  isVerified: boolean;

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

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  userId!: string;

  @ApiProperty({ type: () => UsersUserDTO })
  @IsOptional()
  user?: UsersUserDTO;

  constructor(partial: Partial<UsersTransactionTypeUserAccountDTO>) {
    Object.assign(this, partial);
  }
}
