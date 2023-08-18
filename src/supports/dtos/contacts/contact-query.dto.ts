import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
export class ContactQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Type of contact no.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  type?: string = undefined;

  @ApiPropertyOptional({
    description: 'Contact no.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  contactNo?: string = undefined;
}
