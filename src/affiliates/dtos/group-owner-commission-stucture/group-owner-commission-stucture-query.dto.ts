import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
export class GroupOwnerCommissionStructureQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'id of a AuthGroupOwner.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  commissionGroupId?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of a commission group.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  authGroupOwnerId?: string = undefined;
}
