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

export class UpdateBetCriteriaBetConditionDTO {
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
    description: 'Bet Criteria ID.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  betCriteriaId?: string;

  @ApiPropertyOptional({
    description: 'Bet Condition ID',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  betConditionId?: string;

  @ApiPropertyOptional({
    description: 'Details can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Bet Criteria Bet Condition status',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Updated by ID',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateBetCriteriaBetConditionDTO>) {
    Object.assign(this, partial);
  }
}
