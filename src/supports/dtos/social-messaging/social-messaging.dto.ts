import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsString } from 'class-validator';

export class SocialMessagingDTO extends BaseDTO {
  @ApiProperty({
    description: 'Type of social messaging contact no.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  type!: string;

  @ApiProperty({
    description: 'Social messaging contact no.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  contactNo!: string;

  constructor(partial: Partial<SocialMessagingDTO>) {
    super();
    Object.assign(this, partial);
  }
}
