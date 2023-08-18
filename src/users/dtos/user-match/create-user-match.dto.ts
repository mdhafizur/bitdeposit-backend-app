import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUsersUserMatchDTO {
  @ApiProperty({
    description: 'Details of user favourite match can be stored in this field.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData: Prisma.JsonValue;

  @IsOptional()
  @IsString()
  @IsUUID()
  createdById: string;

  @ApiProperty({
    description: 'User Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Sport Match Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportMatchId: string;

  constructor(partial: Partial<CreateUsersUserMatchDTO>) {
    Object.assign(this, partial);
  }
}
