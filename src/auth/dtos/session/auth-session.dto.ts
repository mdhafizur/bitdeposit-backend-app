import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsIP, IsObject, IsString } from 'class-validator';
import { BaseDTO } from '@src/core/dtos';
import { AuthSessionStatusEnum, Prisma } from '@prisma/client';

export class AuthSessionDTO extends BaseDTO {
  @ApiProperty({
    description: 'Auth session Status.',
    enum: AuthSessionStatusEnum,
    required: true,
  })
  @IsDefined()
  @IsEnum(AuthSessionStatusEnum)
  sessionStatus!: AuthSessionStatusEnum;

  @ApiProperty({
    description: 'Details of platform can be stored in this field.',
    type: JSON,
    required: true,
  })
  @IsDefined()
  @IsObject()
  platform: Prisma.JsonValue;

  @ApiProperty({
    description: 'Details of location can be stored in this field.',
    type: JSON,
    required: true,
  })
  @IsDefined()
  @IsObject()
  location: Prisma.JsonValue;

  @ApiProperty({
    description: 'Device id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  deviceId: string;

  @ApiProperty({
    description: 'Device id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsIP()
  ip: string;

  constructor(partial: Partial<AuthSessionDTO>) {
    super();
    Object.assign(this, partial);
  }
}
