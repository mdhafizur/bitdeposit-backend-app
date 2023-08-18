import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePromotionsAuthGroupOwnerPromoCodeDTO {
  @ApiPropertyOptional({
    description: 'Promo code title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Promo code.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiPropertyOptional({
    description: 'user id by whom the record was created.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  groupOwnerId!: string;

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

  constructor(partial: Partial<CreatePromotionsAuthGroupOwnerPromoCodeDTO>) {
    Object.assign(this, partial);
  }
}
