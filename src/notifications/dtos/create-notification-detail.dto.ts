import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsDefined,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateNotificationDetailDTO {
  @IsDefined()
  @IsBoolean()
  isSeen!: boolean;

  @IsOptional()
  metaData?: Prisma.JsonValue;

  @IsDefined()
  @IsString()
  notificationId!: string;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
