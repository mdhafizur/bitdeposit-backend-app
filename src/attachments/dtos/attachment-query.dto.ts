import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
import { AttachmentTypeEnum } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
export class AttachmentQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Attachment title',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string = undefined;

  @ApiPropertyOptional({
    description: 'Source of attachment',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  source?: string = undefined;

  @ApiPropertyOptional({
    description: 'Attachment type',
    enum: AttachmentTypeEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(AttachmentTypeEnum))
  attachmentType?: AttachmentTypeEnum = undefined;

  @ApiPropertyOptional({
    description: 'User Id',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userId?: string = undefined;
}
