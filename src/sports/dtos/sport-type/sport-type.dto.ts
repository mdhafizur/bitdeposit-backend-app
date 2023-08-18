import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class SportTypeDTO extends BaseDTO {
  @ApiProperty({
    description: 'Sports Type title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  constructor(partial: Partial<SportTypeDTO>) {
    super();
    Object.assign(this, partial);
  }
}
