import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBetConditionDTO {
  @ApiProperty({
    description: 'Bet Condition title',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Bet Condition code.',
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
  displayName?: string;

  @ApiProperty({
    description: 'Bet Condition odd value',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  odd!: Prisma.Decimal;

  @ApiProperty({
    description: 'Bet Condition isLocked',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  isLocked!: boolean;

  @ApiProperty({
    description: 'Bet Condition isVisible',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  isVisible!: boolean;

  @ApiPropertyOptional({
    description: 'Bet Condition status',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
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
    description: 'Created by user id',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateBetConditionDTO>) {
    Object.assign(this, partial);
  }
}
