import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionMethodDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({ type: String })
  @IsDefined()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateTransactionMethodDTO>) {
    Object.assign(this, partial);
  }
}
