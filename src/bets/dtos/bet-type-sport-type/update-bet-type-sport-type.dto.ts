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

export class UpdateBetTypeSportTypeDTO {
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
    description: 'Bet Type ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  betTypeId?: string;

  @ApiPropertyOptional({
    description: 'Bet Type ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  sportTypeId?: string;

  @ApiPropertyOptional({
    description: 'Details of betting type can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Bet Condition status',
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
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateBetTypeSportTypeDTO>) {
    Object.assign(this, partial);
  }
}
