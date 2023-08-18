import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserMatchBetDTO } from '@src/users/dtos';
import { BaseDTO } from '@src/core/dtos';

export class BetTypeDTO extends BaseDTO {
  @ApiProperty({
    description: 'Betting type title',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @Type(() => UserMatchBetDTO)
  bets?: UserMatchBetDTO;

  constructor(partial: Partial<BetTypeDTO>) {
    super();
    Object.assign(this, partial);
  }
}
