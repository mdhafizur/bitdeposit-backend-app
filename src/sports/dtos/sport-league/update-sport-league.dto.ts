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

export class UpdateSportLeagueDTO {
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
    description: 'Sports League title.',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Sports League Priority.',
    type: Number,
    required: true,
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  leaguePriority?: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Sports League status.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Details of sports league can be stored in this field.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Updated by id.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  @ApiProperty({
    description: 'sport Type by id.',
    type: JSON,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportTypeId!: string;

  @ApiProperty({
    description: 'sport category by id.',
    type: JSON,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportCategoryId!: string;

  constructor(partial: Partial<UpdateSportLeagueDTO>) {
    Object.assign(this, partial);
  }
}
