import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttachmentTypeEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import {
  IsDefined,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAttachmentDTO {
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

  @ApiPropertyOptional({
    description: 'Created by user id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateAttachmentDTO>) {
    Object.assign(this, partial);
  }
}
