import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';

import {
  IsDefined,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UpdateGroupTypeCommissionStructureDTO {
  @ApiProperty({
    description: 'id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  authGroupOwnerGroupTypeId?: string;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  bdPercentage!: Prisma.Decimal;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  oneXPercentage!: Prisma.Decimal;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  incomePercentage!: Prisma.Decimal;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateGroupTypeCommissionStructureDTO>) {
    Object.assign(this, partial);
  }
}
