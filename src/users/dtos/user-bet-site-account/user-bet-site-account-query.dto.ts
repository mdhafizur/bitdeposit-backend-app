import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';

export class UserBetSiteAccountQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'id of a Bet Site.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  betSiteId?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of a Bet Site Account.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  betSiteAccountId?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of a User.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userId?: string = undefined;
}
