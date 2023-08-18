import { BaseDTO } from '@src/core/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';

export class SportTypeBetCriteriaDTO extends BaseDTO {
  @ApiProperty({
    description: 'Sports Type id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportTypeId!: string;

  @ApiProperty({
    description: 'Bet Criteria id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betCriteriaId!: string;

  constructor(partial: Partial<SportTypeBetCriteriaDTO>) {
    super();
    Object.assign(this, partial);
  }
}
