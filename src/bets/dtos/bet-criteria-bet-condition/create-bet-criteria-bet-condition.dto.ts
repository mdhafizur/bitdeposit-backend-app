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

export class CreateBetCriteriaBetConditionDTO {
  @ApiProperty({
    description: 'Bet Criteria ID.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsUUID()
  betCriteriaId!: string;

  @ApiProperty({
    description: 'Bet Condition ID',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsUUID()
  betConditionId!: string;

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

  constructor(partial: Partial<CreateBetCriteriaBetConditionDTO>) {
    Object.assign(this, partial);
  }
}
