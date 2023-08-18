import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';

import {
  IsDefined,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTransactionMethodDTO {
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
  name!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({ type: String })
  @IsDefined()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateTransactionMethodDTO>) {
    Object.assign(this, partial);
  }
}
