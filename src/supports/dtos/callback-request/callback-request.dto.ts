import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsString, IsUUID } from 'class-validator';

export class CallbackRequestDTO extends BaseDTO {
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

  @ApiProperty({
    description: 'Assigned user id.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  userId?: string = undefined;

  constructor(partial: Partial<CallbackRequestDTO>) {
    super();
    Object.assign(this, partial);
  }
}
