import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
export class BetSiteQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Name of Bet Site.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string = undefined;

  @ApiPropertyOptional({
    description: 'Code of a Bet Site.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string = undefined;
}
