import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
export class EmailQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Type of email.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  type?: string = undefined;

  @ApiPropertyOptional({
    description: 'Email id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string = undefined;
}
