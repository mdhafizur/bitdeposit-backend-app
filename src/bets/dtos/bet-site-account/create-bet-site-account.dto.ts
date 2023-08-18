import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBetSiteAccountDTO {
  @ApiProperty({
    description: 'Bet Site Account Name',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  accountName!: string;

  @ApiProperty({
    description: 'Bet Site Account id',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  accountId!: string;

  @ApiProperty({
    description: 'Bet Site  id',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betSiteId!: string;

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
    required: true,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateBetSiteAccountDTO>) {
    Object.assign(this, partial);
  }
}
