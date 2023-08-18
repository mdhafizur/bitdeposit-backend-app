import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsIP,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AuthSessionStatusEnum, FieldStatusEnum, Prisma } from '@prisma/client';

export class UpdateAuthSessionDTO {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({
    description: 'Auth session Status.',
    enum: AuthSessionStatusEnum,
    required: true,
  })
  @IsDefined()
  @IsEnum(AuthSessionStatusEnum)
  sessionStatus!: AuthSessionStatusEnum;

  @ApiPropertyOptional({
    description: 'Details of platform can be stored in this field.',
    type: JSON,
    required: true,
  })
  @IsOptional()
  @IsObject()
  platform!: Prisma.JsonValue;

  @ApiPropertyOptional({
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

  @ApiProperty({
    description: 'Device id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsIP()
  ip: string;

  @ApiPropertyOptional({
    description: 'Record Status.',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(FieldStatusEnum)
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Details of Auth Session can be stored in this field.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData: Prisma.JsonValue;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsUUID()
  updatedById?: string;

  constructor(partial: Partial<UpdateAuthSessionDTO>) {
    Object.assign(this, partial);
  }
}
