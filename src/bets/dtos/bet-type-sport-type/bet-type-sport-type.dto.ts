import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';

import { IsDefined, IsString, IsUUID } from 'class-validator';

export class BetTypeSportTypeDTO extends BaseDTO {
  @ApiProperty({
    description: 'Bet Type ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsUUID()
  betTypeId!: string;

  @ApiProperty({
    description: 'Bet Type ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsUUID()
  sportTypeId!: string;

  constructor(partial: Partial<BetTypeSportTypeDTO>) {
    super();
    Object.assign(this, partial);
  }
}
