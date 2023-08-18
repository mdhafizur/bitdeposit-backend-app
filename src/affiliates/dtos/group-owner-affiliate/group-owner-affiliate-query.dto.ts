import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
export class GroupOwnerAffiliateQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'id of a AuthGroupOwner Group Type.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  groupOwnerId?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of a AuthGroupOwner Group Type.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  affiliateId?: string = undefined;
}
