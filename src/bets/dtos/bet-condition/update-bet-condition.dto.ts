import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateBetConditionDTO {
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
    description: 'Bet Condition name.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Bet Condition code.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: 'Bet Criteria display name.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  displayName?: string;

  @ApiPropertyOptional({
    description: 'Bet Condition odd value',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  odd?: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Bet Condition isLocked',
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isLocked?: boolean;

  @ApiPropertyOptional({
    description: 'Bet Condition isVisible',
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @ApiPropertyOptional({
    description: 'Bet Condition status',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Details of bet condition can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Updated by ID',
    type: String,
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateBetConditionDTO>) {
    Object.assign(this, partial);
  }
}
