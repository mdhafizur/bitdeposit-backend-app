import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUsersTransactionTypeUserAccountDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  title!: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  value!: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  verificationCode?: number;

  @ApiPropertyOptional()
  @IsOptional()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  transactionTypeId!: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  userId!: string;

  constructor(partial: Partial<CreateUsersTransactionTypeUserAccountDTO>) {
    Object.assign(this, partial);
  }
}
