import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';

export class SportMatchBetConditionQuery extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'id of a Sport Match.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  sportMatchId?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of a Bet Condition.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  betConditionId?: string = undefined;
}
