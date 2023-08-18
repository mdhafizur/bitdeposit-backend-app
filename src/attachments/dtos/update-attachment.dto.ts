import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttachmentTypeEnum, FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';

import {
  IsDefined,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAttachmentDTO {
  @ApiProperty({
    description: 'id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiPropertyOptional({
    description: 'Attachment title',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Source of the attachment', type: String })
  @IsDefined()
  @IsString()
  source!: string;

  @ApiProperty({
    description: 'Attachment type',
    enum: AttachmentTypeEnum,
    required: true,
  })
  @IsDefined()
  @IsIn(getEnumValues(AttachmentTypeEnum))
  attachmentType!: AttachmentTypeEnum;

  @ApiProperty({
    description: 'User Id',
    required: true,
  })
  @IsDefined()
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'Details can be stored in metaData',
    type: JSON,
    required: true,
  })
  @IsDefined()
  @IsObject()
  metaData!: Prisma.JsonValue;

  @ApiPropertyOptional({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateAttachmentDTO>) {
    Object.assign(this, partial);
  }
}
