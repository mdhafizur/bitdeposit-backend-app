import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEmailDTO {
  @ApiProperty({ description: 'Type of mail.', type: String })
  @IsDefined()
  @IsString()
  type!: string;

  @ApiProperty({ description: 'Email id.', type: String })
  @IsDefined()
  @IsString()
  email!: string;

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

  constructor(partial: Partial<CreateEmailDTO>) {
    Object.assign(this, partial);
  }
}
