import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';

export class BetTypeSportTypeQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'id of a Bet Type.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  betTypeId?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of a Sport Type.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  sportTypeId?: string = undefined;
}
