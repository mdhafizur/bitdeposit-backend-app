import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsDefined, IsObject, IsOptional, IsUUID } from 'class-validator';

export class CreateGroupOwnerAffiliateDTO {
  @ApiProperty({
    description: 'id of a group owner.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  groupOwnerId!: string;

  @ApiProperty({
    description: 'id of a affiliate.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  affiliateId!: string;

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

  constructor(partial: Partial<CreateGroupOwnerAffiliateDTO>) {
    Object.assign(this, partial);
  }
}
