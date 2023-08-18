import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SportTeamDTO extends BaseDTO {
  @ApiProperty({
    description: 'Sports Team title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Sports type Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportTypeId!: string;

  constructor(partial: Partial<SportTeamDTO>) {
    super();
    Object.assign(this, partial);
  }
}
