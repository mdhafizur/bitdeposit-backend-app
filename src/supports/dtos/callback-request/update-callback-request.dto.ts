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

export class UpdateCallbackRequestDTO {
  @ApiPropertyOptional({
    description: 'ID',
    type: String,
    required: false,
    format: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Callback status.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsString()
  callBackStatus!: string;

  @ApiProperty({
    description: 'CallbackTo phone no.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsString()
  callbackTo!: string;

  @ApiPropertyOptional({
    description: 'Assigned user id.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  userId!: string;

  @ApiPropertyOptional({
    description: 'CallBack issue description.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

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

  constructor(partial: Partial<UpdateCallbackRequestDTO>) {
    Object.assign(this, partial);
  }
}
