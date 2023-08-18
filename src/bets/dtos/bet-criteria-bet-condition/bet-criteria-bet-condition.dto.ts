import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { Type } from 'class-transformer';
import { IsDefined, IsUUID } from 'class-validator';
import { BetConditionDTO } from '../bet-condition';

export class BetCriteriaBetConditionDTO extends BaseDTO {
  @ApiProperty({
    description: 'ID.',
    type: String,
    required: true,
    format: 'uuid',
  })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiProperty({
    description: 'Bet Criteria ID.',
    type: String,
    required: true,
    format: 'uuid',
  })
  @IsDefined()
  @IsUUID()
  betCriteriaId!: string;

  @ApiProperty({ type: () => BetConditionDTO })
  @IsDefined()
  @Type(() => BetConditionDTO)
  betCondition: BetConditionDTO;

  @ApiProperty({
    description: 'Bet Condition ID',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betConditionId!: string;

  constructor(partial: Partial<BetCriteriaBetConditionDTO>) {
    super();
    Object.assign(this, partial);
  }
}
