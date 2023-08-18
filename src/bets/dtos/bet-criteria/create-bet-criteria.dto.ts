import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBetCriteriaDTO {
  @ApiProperty({
    description: 'Bet Criteria name',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Bet Criteria code',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  code!: string;

  @ApiProperty({
    description: 'Bet Criteria display name.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  displayName!: string;

  @ApiProperty({
    description: 'Bet Criteria isLocked',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  isLocked!: boolean;

  @ApiProperty({
    description: 'Bet Criteria isVisible',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  isVisible!: boolean;

  @ApiPropertyOptional({
    description: 'Status',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Details of match criteria can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Created by user id',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateBetCriteriaDTO>) {
    Object.assign(this, partial);
  }
}
