import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsString } from 'class-validator';

export class EmailDTO extends BaseDTO {
  @ApiProperty({
    description: 'Type of mail.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  type!: string;

  @ApiProperty({
    description: 'Email id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  email!: string;

  constructor(partial: Partial<EmailDTO>) {
    super();
    Object.assign(this, partial);
  }
}
