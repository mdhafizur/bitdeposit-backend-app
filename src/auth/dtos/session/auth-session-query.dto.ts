import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
import { AuthSessionStatusEnum } from '@prisma/client';

export class AuthSessionQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Device id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  deviceId?: string = undefined;

  @ApiPropertyOptional({
    description: 'user id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string = undefined;

  @ApiPropertyOptional({
    description: 'session status.',
    type: AuthSessionStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(AuthSessionStatusEnum)
  sessionStatus?: AuthSessionStatusEnum = undefined;

  @ApiPropertyOptional({
    description: 'ip address.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  ip?: string = undefined;
}
