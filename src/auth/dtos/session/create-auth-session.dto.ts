import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AuthSessionStatusEnum, Prisma } from '@prisma/client';

export class CreateAuthSessionDTO {
  @ApiProperty({
    description: 'Details of platform can be stored in this field.',
    type: JSON,
    required: true,
  })
  @IsOptional()
  @IsObject()
  platform?: Prisma.JsonValue;

  @ApiProperty({
    description: 'Details of location can be stored in this field.',
    type: JSON,
    required: true,
  })
  @IsOptional()
  @IsObject()
  location?: Prisma.JsonValue;

  @ApiProperty({
    description: 'Device id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  deviceId!: string;

  @ApiPropertyOptional({
    description: 'ip address.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  ip: string;

  @ApiPropertyOptional({
    description: 'status of the session',
    enum: AuthSessionStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(AuthSessionStatusEnum)
  sessionStatus? = AuthSessionStatusEnum.INACTIVE;

  @ApiPropertyOptional({
    description: 'Details of Auth Session can be stored in this field.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'user id',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsOptional()
  @IsUUID()
  userId!: string;

  @ApiPropertyOptional({
    description: 'Created by user id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateAuthSessionDTO>) {
    Object.assign(this, partial);
  }
}
