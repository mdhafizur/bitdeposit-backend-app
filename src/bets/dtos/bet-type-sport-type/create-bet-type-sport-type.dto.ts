import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import {
  IsDefined,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBetTypeSportTypeDTO {
  @ApiProperty({
    description: 'Bet Type ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsUUID()
  betTypeId!: string;

  @ApiProperty({
    description: 'Bet Type ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsUUID()
  sportTypeId!: string;

  @ApiPropertyOptional({
    description: 'Details of betting type can be stored in this field',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Status',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Created by user id',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateBetTypeSportTypeDTO>) {
    Object.assign(this, partial);
  }
}
