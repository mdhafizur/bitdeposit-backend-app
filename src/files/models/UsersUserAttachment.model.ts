import {
  AttachmentTypeEnum,
  FieldStatusEnum,
  Prisma,
  UsersUser,
} from '@prisma/client';
import { getEnumValues } from '@src/core/helpers';

import { IsDate, IsDefined, IsIn, IsOptional, IsString } from 'class-validator';

export class UsersUserAttachment {
  @IsOptional()
  @IsString()
  title?: string;

  @IsDefined()
  @IsString()
  key!: string;

  @IsDefined()
  @IsString()
  url!: string;

  @IsDefined()
  @IsIn(getEnumValues(AttachmentTypeEnum))
  attachmentType!: AttachmentTypeEnum;

  @IsOptional()
  metaData?: Prisma.JsonValue;

  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @IsOptional()
  @IsString()
  createdById?: string;

  @IsOptional()
  @IsString()
  updatedById?: string;

  @IsDefined()
  @IsDate()
  createdAt!: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @IsDefined()
  @IsString()
  userId!: string;

  @IsDefined()
  user!: UsersUser;

  constructor(partial: Partial<UsersUserAttachment>) {
    Object.assign(this, partial);
  }
}
