import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsString } from 'class-validator';

export class ContactDTO extends BaseDTO {
  @ApiProperty({
    description: 'Type of contact no.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  type!: string;

  @ApiProperty({
    description: 'Contact no.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  contactNo!: string;

  constructor(partial: Partial<ContactDTO>) {
    super();
    Object.assign(this, partial);
  }
}
