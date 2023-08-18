import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, MatchStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSportMatchDTO {
  @ApiProperty({
    description: 'Sports Match title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Sports Team One Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  teamOneId!: string;

  @ApiProperty({
    description: 'Sports Team two Id.',
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
  @IsDefined()
  @IsNotEmpty()
  matchPriority!: Prisma.Decimal;

  @ApiProperty({
    description: 'Sports Match Status.',
    type: String,
    required: true,
  })
  @IsString()
  @IsIn(getEnumValues(MatchStatusEnum))
  matchStatus!: MatchStatusEnum;

  @ApiPropertyOptional({
    description: 'Data status.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Details of sports match can be stored in this field.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Created by ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  @ApiProperty({
    description: 'Sports category and type relation Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportLeagueId?: string;

  constructor(partial: Partial<CreateSportMatchDTO>) {
    Object.assign(this, partial);
  }
}
