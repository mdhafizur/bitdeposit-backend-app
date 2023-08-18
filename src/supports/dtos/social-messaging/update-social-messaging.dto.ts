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

export class UpdateSocialMessagingDTO {
  @ApiPropertyOptional({
    description: 'ID',
    type: String,
    required: false,
    format: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: 'Type of social messaging contact no.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    description: 'Social messaging contac no.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsString()
  contactNo?: string;

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

  constructor(partial: Partial<UpdateSocialMessagingDTO>) {
    Object.assign(this, partial);
  }
}
