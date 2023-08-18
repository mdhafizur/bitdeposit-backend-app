import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class UpdateBetSiteAccountDTO {
  @ApiProperty({
    description: 'id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiProperty({
    description: 'Bet Site Account Name',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  accountName!: string;

  @ApiProperty({
    description: 'Bet Site Account id',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  accountId!: string;

  @ApiProperty({
    description: 'Bet Site  id',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betSiteId!: string;

  @ApiPropertyOptional({
    description: 'Details can be stored in metaData',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateBetSiteAccountDTO>) {
    Object.assign(this, partial);
  }
}
