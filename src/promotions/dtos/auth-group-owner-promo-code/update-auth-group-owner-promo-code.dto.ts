import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';

import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdatePromotionsAuthGroupOwnerPromoCodeDTO {
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'id of record.',
  })
  @IsDefined()
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: 'Promo code title.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({
    description: 'Promo code code.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiPropertyOptional({
    description: 'user id by whom the record was created.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  groupOwnerId?: string;

  @ApiPropertyOptional({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Extra details of the records can be put here.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'user id by whom the record was created.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  @ApiPropertyOptional({
    description: 'user id by whom the record was updated.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdatePromotionsAuthGroupOwnerPromoCodeDTO>) {
    Object.assign(this, partial);
  }
}
