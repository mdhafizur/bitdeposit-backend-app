import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsString } from 'class-validator';

export class SportCategoryDTO extends BaseDTO {
  @ApiProperty({
    description: 'Sports Category title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  name!: string;

  constructor(partial: Partial<SportCategoryDTO>) {
    super();
    Object.assign(this, partial);
  }
}
