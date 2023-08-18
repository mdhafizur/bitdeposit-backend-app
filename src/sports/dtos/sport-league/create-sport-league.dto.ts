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

export class CreateSportLeagueDTO {
  @ApiProperty({
    description: 'Sports League title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Sports League Priority.',
    type: Number,
    required: true,
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  leaguePriority!: Prisma.Decimal;

  @ApiPropertyOptional({
    description: 'Details of sports league can be stored in this field.',
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
    description: 'Sports type Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportTypeId!: string;

  @ApiProperty({
    description: 'Sports Category Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportCategoryId!: string;

  constructor(partial: Partial<CreateSportLeagueDTO>) {
    Object.assign(this, partial);
  }
}
