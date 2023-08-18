import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';

export class SportTypeBetCriteriaQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Sport Type id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  sportTypeId?: string = undefined;
}
