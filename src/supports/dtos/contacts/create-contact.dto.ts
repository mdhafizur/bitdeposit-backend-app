import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateContactDTO {
  @ApiProperty({ description: 'Type of contact no.', type: String })
  @IsDefined()
  @IsString()
  type!: string;

  @ApiProperty({ description: 'Contact no.', type: String })
  @IsDefined()
  @IsString()
  contactNo!: string;

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

  constructor(partial: Partial<CreateContactDTO>) {
    Object.assign(this, partial);
  }
}
