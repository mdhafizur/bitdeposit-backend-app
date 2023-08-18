import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
export class CommissionGroupQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Title of Commission group.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string = undefined;
}
