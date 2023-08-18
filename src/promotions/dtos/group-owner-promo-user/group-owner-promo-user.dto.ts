import { ApiProperty } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { IsDefined, IsIn, IsObject, IsOptional, IsUUID } from 'class-validator';

export class PromotionsGroupOwnerPromoUserDTO {
  @ApiProperty({
    description: 'Promo Code Id',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  promotionId: string;

  @ApiProperty({
    description: 'Promo Code user ID',
    type: String,
    required: true,
  })
  @IsDefined()
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

  constructor(partial: Partial<PromotionsGroupOwnerPromoUserDTO>) {
    Object.assign(this, partial);
  }
}
