import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateGroupTypeCommissionStructureDTO {
  @ApiProperty({
    description: 'BitDeposit percentage amount',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  bdPercentage!: Prisma.Decimal;

  @ApiProperty({
    description: 'OneXTransfer percentage amount',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  oneXPercentage!: Prisma.Decimal;

  @ApiProperty({
    description: 'Income percentage amount',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  incomePercentage!: Prisma.Decimal;

  @ApiProperty({
    description: 'id of a AuthGroupOwner Group Type.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  authGroupOwnerGroupTypeId!: string;

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

  constructor(partial: Partial<CreateGroupTypeCommissionStructureDTO>) {
    Object.assign(this, partial);
  }
}
