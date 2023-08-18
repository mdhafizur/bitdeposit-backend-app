import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';

export class UsersQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Users unique username.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  userName?: string = undefined;

  @ApiPropertyOptional({
    description: 'Users email.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string = undefined;

  @ApiPropertyOptional({
    description: 'Users phone.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string = undefined;
}
