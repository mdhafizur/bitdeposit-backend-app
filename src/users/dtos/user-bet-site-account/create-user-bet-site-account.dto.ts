import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUserBetSiteAccountDTO {
  @ApiPropertyOptional({
    description: 'Bet Site User Account Name.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Bet Site ID',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betSiteAccountId!: string;

  @ApiProperty({
    description: 'User ID',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsDefined()
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'Credentails can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsDefined()
  @IsObject()
  metaData!: Prisma.JsonValue;

  @ApiProperty({
    description: 'Created by user id',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateUserBetSiteAccountDTO>) {
    Object.assign(this, partial);
  }
}
