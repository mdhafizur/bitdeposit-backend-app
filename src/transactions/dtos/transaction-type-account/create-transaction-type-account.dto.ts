import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTransactionTypeAccountDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  title!: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  value!: string;

  @ApiPropertyOptional({ type: JSON })
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

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  assignedToUserId!: string;

  constructor(partial: Partial<CreateTransactionTypeAccountDTO>) {
    Object.assign(this, partial);
  }
}
