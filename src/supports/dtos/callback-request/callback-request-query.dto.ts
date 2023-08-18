import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
export class CallbackRequestQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Callback status.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  callBackStatus?: string = undefined;

  @ApiPropertyOptional({
    description: 'CallbackTo phone no.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  callbackTo?: string = undefined;

  @ApiPropertyOptional({
    description: 'Assigned user id.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userId: string = undefined;
}
