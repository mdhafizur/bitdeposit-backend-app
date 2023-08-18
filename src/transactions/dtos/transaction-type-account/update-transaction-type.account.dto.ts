import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';

import { IsDefined, IsIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTransactionTypeAccountDTO {
  @ApiProperty({
    description: 'ID',
    type: String,
    required: false,
    format: 'uuid',
  })
  @IsDefined()
  @IsUUID()
  id: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  title!: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  value!: string;

  @ApiProperty({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsUUID()
  transactionTypeId!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  assignedToUserId!: string;

  constructor(partial: Partial<UpdateTransactionTypeAccountDTO>) {
    Object.assign(this, partial);
  }
}
