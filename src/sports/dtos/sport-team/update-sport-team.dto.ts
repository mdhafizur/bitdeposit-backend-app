import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateSportTeamDTO {
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
    description: 'Sports Team title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Sports type Id.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  sportTypeId!: string;

  @ApiPropertyOptional({
    description: 'Sports team status.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Details of sports team can be stored in this field.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Updated by Id.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  updatedById: string;

  constructor(partial: Partial<UpdateSportTeamDTO>) {
    Object.assign(this, partial);
  }
}
