import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttachmentTypeEnum } from '@prisma/client';
import { BaseDTO } from '@src/core/dtos';
import { getEnumValues } from '@src/core/helpers';
import { IsDefined, IsIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class AttachmentDTO extends BaseDTO {
  @ApiPropertyOptional({
    description: 'Attachment title',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Source of attachment', type: String })
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
  attachmentType: AttachmentTypeEnum = AttachmentTypeEnum.FILE;

  @ApiProperty({
    description: 'User Id',
    required: true,
  })
  @IsDefined()
  @IsUUID()
  userId!: string;

  constructor(partial: Partial<AttachmentDTO>) {
    super();
    Object.assign(this, partial);
  }
}
