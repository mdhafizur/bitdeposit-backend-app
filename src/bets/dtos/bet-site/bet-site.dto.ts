import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsString, IsUrl } from 'class-validator';

export class BetSiteDTO extends BaseDTO {
  @ApiProperty({
    description: 'Bet Site Name',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Bet Site URL',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUrl()
  url!: string;

  @ApiProperty({
    description: 'Bet Site Code',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  code!: string;

  constructor(partial: Partial<BetSiteDTO>) {
    super();
    Object.assign(this, partial);
  }
}
