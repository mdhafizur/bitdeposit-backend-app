import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCallbackRequestDTO {
  @ApiProperty({ description: 'Callback status.', type: String })
  @IsDefined()
  @IsString()
  callBackStatus!: string;

  @ApiProperty({
    description: 'Description of issue and solution.',
    type: String,
  })
  @IsDefined()
  @IsString()
  description!: string;

  @ApiProperty({ description: 'CallbackTo no.', type: String })
  @IsDefined()
  @IsString()
  callbackTo!: string;

  @ApiPropertyOptional({
    description: 'Details can be stored in metaData',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Created by user id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  constructor(partial: Partial<CreateCallbackRequestDTO>) {
    Object.assign(this, partial);
  }
}
