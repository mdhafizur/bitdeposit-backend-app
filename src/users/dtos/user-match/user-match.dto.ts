import { UsersUserDTO } from '@src/users/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';
import { SportMatchDTO } from '@src/sports/dtos';
import { Type } from 'class-transformer';
import { IsDefined, IsIn, IsObject, IsOptional, IsUUID } from 'class-validator';

export class UserMatchDTO {
  @ApiProperty({
    description: 'id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'User Favourite Match Status.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status: FieldStatusEnum;

  @ApiProperty({
    description: 'Details of user favourite match can be stored in this field.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData: Prisma.JsonValue;

  @IsOptional()
  @IsUUID()
  createdById: string;

  @IsOptional()
  @IsUUID()
  updatedById: string;

  @ApiProperty({
    description: 'User Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  userId: string;

  @ApiProperty({ type: () => UsersUserDTO })
  @IsOptional()
  @Type(() => UsersUserDTO)
  user?: string;

  @ApiProperty({
    description: 'Sport Match id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportMatchId: string;

  @ApiProperty({ type: () => SportMatchDTO })
  @IsOptional()
  @Type(() => SportMatchDTO)
  sportMatch?: string;

  constructor(partial: Partial<UserMatchDTO>) {
    Object.assign(this, partial);
  }
}
