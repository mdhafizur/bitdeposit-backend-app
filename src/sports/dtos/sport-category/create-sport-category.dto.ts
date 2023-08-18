import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSportCategoryDTO {
  @ApiProperty({
    description: 'Sport Category title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    description: 'Details of Sport Category can be stored in this field.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Created by ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  @ApiProperty({
    description: 'Bet Criteria Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betCriteriaId!: string;

  constructor(partial: Partial<CreateSportCategoryDTO>) {
    Object.assign(this, partial);
  }
}
