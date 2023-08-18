import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';

import { IsDefined, IsIn, IsObject, IsOptional, IsUUID } from 'class-validator';

export class UpdatePromotionsGroupOwnerPromoUserDTO {
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'id of record.',
  })
  @IsDefined()
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: 'Promo Code id.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  promotionId: string;

  @ApiPropertyOptional({
    description: 'Promo Code user id',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Status',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status: FieldStatusEnum;

  @ApiProperty({
    description: 'Details information can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData: Prisma.JsonValue;

  @IsOptional()
  @IsUUID()
  createdById: string;

  @IsOptional()
  @IsUUID()
  updatedById: string;

  constructor(partial: Partial<UpdatePromotionsGroupOwnerPromoUserDTO>) {
    Object.assign(this, partial);
  }
}
