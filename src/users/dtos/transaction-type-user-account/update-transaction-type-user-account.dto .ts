import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';

import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateUsersTransactionTypeUserAccountDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  title!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  value!: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  verificationCode?: number;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  isVerified: boolean;

  @ApiPropertyOptional({
    description: 'User Transaction Account status.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status: FieldStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  transactionTypeId!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  userId!: string;

  constructor(partial: Partial<UpdateUsersTransactionTypeUserAccountDTO>) {
    Object.assign(this, partial);
  }
}
