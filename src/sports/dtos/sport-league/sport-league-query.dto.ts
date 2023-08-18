import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';

export class SportLeagueQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Sports Match title.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string = undefined;

  @ApiPropertyOptional({
    description: 'Sport Type id.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  sportTypeId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Sport Category id.',
  })
  @IsOptional()
  sportCategoryId?: string | null = undefined;

  @ApiPropertyOptional({
    description: 'league Priority.',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  leaguePriority?: number = undefined;
}
