import { ApiProperty } from '@nestjs/swagger';
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

export class UpdateUserMatchDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiProperty({
    description: 'User Favourite Match Status.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status: FieldStatusEnum;

  @ApiProperty({
    description: 'Details of user favourite match can be stored in this field.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData: Prisma.JsonValue;

  @IsOptional()
  @IsString()
  @IsUUID()
  createdById: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  updatedById: string;

  @ApiProperty({
    description: 'User Id.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Sport Match Id.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  sportMatchId: string;

  constructor(partial: Partial<UpdateUserMatchDTO>) {
    Object.assign(this, partial);
  }
}
