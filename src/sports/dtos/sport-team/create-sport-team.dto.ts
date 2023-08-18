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

export class CreateSportTeamDTO {
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
  @IsDefined()
  @IsString()
  sportTypeId!: string;

  @ApiPropertyOptional({
    description: 'Details of sports team can be stored in this field.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Created by Id.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateSportTeamDTO>) {
    Object.assign(this, partial);
  }
}
