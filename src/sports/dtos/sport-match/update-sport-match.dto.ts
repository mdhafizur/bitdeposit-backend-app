import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, MatchStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import {
  IsDefined,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateSportMatchDTO {
  @ApiProperty({
    description: 'id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiPropertyOptional({
    description: 'Sports Match title.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Sports Team One Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  teamOneId!: string;

  @ApiProperty({
    description: 'Sports Team Two Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  teamTwoId!: string;

  @ApiProperty({
    description: 'Match Priority.',
    type: Number,
    required: true,
  })
  @IsOptional()
  @IsDefined()
  matchPriority!: Prisma.Decimal;

  @ApiProperty({
    description: 'Sports Match Status.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsIn(getEnumValues(MatchStatusEnum))
  matchStatus!: MatchStatusEnum;

  @ApiProperty({
    description: 'Data status.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @ApiProperty({
    description: 'Details of sports match can be stored in this field.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Sports league id.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  @ApiProperty({
    description: 'Sports league id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportLeagueId!: string;

  constructor(partial: Partial<UpdateSportMatchDTO>) {
    Object.assign(this, partial);
  }
}
