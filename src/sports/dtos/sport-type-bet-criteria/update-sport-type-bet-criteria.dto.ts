import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import {
  IsDefined,
  IsEnum,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UpdateSportTypeBetCriteriaDTO {
  @ApiProperty({
    description: 'ID',
    type: String,
    required: false,
    format: 'uuid',
  })
  @IsDefined()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Sports Type id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportTypeId!: string;

  @ApiProperty({
    description: 'Bet Criteria od.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betCriteriaId!: string;

  @ApiPropertyOptional({
    description: 'Record Status.',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(FieldStatusEnum)
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Extra details of the records can be put here.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'user id by whom the record was updated.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateSportTypeBetCriteriaDTO>) {
    Object.assign(this, partial);
  }
}
