import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class BetSlipSettingDTO extends BaseDTO {
  @ApiProperty({
    description: 'Bet Slip Settings title',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  constructor(partial: Partial<BetSlipSettingDTO>) {
    super();
    Object.assign(this, partial);
  }
}
