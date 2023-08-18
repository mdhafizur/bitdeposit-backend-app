import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class CreateBetSiteDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  name!: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsUrl()
  url!: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  code!: string;

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

  constructor(partial: Partial<CreateBetSiteDTO>) {
    Object.assign(this, partial);
  }
}
