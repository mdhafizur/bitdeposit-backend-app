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

export class UpdateUserBetSiteAccountDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiPropertyOptional({
    description: 'Bet Site User Account Name.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Bet Site Account id.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  betSiteAccountId?: string;

  @ApiPropertyOptional({
    description: 'User ID',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  userId?: string;

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

  constructor(partial: Partial<UpdateUserBetSiteAccountDTO>) {
    Object.assign(this, partial);
  }
}
