import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsDefined, IsObject, IsOptional, IsUUID } from 'class-validator';

export class CreateSportTypeBetCriteriaDTO {
  @ApiProperty({
    description: 'Sports Type id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportTypeId!: string;

  @ApiProperty({
    description: 'Bet Criteria id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betCriteriaId!: string;

  @ApiPropertyOptional({
    description: 'Extra details of the records can be put here.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'user id by whom the record was created.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsUUID()
  createdById!: string;

  constructor(partial: Partial<CreateSportTypeBetCriteriaDTO>) {
    Object.assign(this, partial);
  }
}
