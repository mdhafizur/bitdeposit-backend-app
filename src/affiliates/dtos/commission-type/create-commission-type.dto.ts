import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCommissionTypeDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  title!: string;

  @ApiPropertyOptional({
    description: 'Details can be stored in metaData',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Created by user id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateCommissionTypeDTO>) {
    Object.assign(this, partial);
  }
}
