import { Prisma } from '@prisma/client';
import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDTO {
  @IsDefined()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDefined()
  @IsString()
  type!: string;

  @IsOptional()
  metaData?: Prisma.JsonValue;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  groupId?: string;
}
