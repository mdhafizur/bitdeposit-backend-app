import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsString } from 'class-validator';

export class CommissionGroupDTO extends BaseDTO {
  @ApiProperty({
    description: 'Commission Group Title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  title!: string;

  constructor(partial: Partial<CommissionGroupDTO>) {
    super();
    Object.assign(this, partial);
  }
}
