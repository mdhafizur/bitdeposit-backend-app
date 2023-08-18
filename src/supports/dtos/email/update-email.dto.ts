import { ApiPropertyOptional } from '@nestjs/swagger';
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

export class UpdateEmailDTO {
  @ApiPropertyOptional({
    description: 'ID',
    type: String,
    required: false,
    format: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: 'Type of email.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    description: 'Email id.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsString()
  eamil?: string;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateEmailDTO>) {
    Object.assign(this, partial);
  }
}
