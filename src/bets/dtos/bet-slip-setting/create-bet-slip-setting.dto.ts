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

export class CreateBetSlipSettingDTO {
  @ApiProperty({
    description: 'Bet Slip Settings title',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    description: 'Details can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Status',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Created by user id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateBetSlipSettingDTO>) {
    Object.assign(this, partial);
  }
}
