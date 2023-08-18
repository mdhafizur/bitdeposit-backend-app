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

export class UpdateBetSlipSettingDTO {
  @ApiProperty({
    description: 'id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiPropertyOptional({
    description: 'Bet Slip Settings title',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Details can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Bet slip setting status',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Updated by ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateBetSlipSettingDTO>) {
    Object.assign(this, partial);
  }
}
