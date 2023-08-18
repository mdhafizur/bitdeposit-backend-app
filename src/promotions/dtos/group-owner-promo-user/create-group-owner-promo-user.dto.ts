import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsDefined, IsObject, IsOptional, IsUUID } from 'class-validator';

export class CreatePromotionsGroupOwnerPromoUserDTO {
  @ApiProperty({
    description: 'Promo Code Id',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  promotionId: string;

  @IsOptional()
  @IsUUID()
  userId: string;

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

  constructor(partial: Partial<CreatePromotionsGroupOwnerPromoUserDTO>) {
    Object.assign(this, partial);
  }
}
