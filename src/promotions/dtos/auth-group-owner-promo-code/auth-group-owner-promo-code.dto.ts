import { ApiProperty } from '@nestjs/swagger';
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

export class PromotionsAuthGroupOwnerPromoCodeDTO {
  @ApiProperty({
    description: 'PromoCode Title',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'PromoCode Title',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  code!: string;

  @ApiProperty({
    description: 'Group Owner ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  groupOwnerId: string;

  @ApiProperty({
    description: 'Status',
    type: String,
    required: true,
  })
  @IsDefined()
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

  constructor(partial: Partial<PromotionsAuthGroupOwnerPromoCodeDTO>) {
    Object.assign(this, partial);
  }
}
