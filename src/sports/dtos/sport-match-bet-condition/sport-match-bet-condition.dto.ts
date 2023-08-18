import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BetConditionDTO } from '@src/bets/dtos';
import { BaseDTO } from '@src/core/dtos';
import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class SportsSportMatchBetCondtionDTO extends BaseDTO {
  @ApiProperty({
    description: 'Bet Condition odd value',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsPositive()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Transform(
    ({ value }) => {
      if (value.d[1] !== undefined)
        return Number(`${value.d[0]}.${value.d[1]}`);
      return Number(`${value.d[0]}`);
    },
    {
      toPlainOnly: true,
    },
  )
  odd!: Prisma.Decimal;

  @ApiProperty({
    description: 'Bet Condition isLocked',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  isLocked!: boolean;

  @ApiProperty({
    description: 'Bet Condition isVisible',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  isVisible!: boolean;

  @ApiProperty({
    description: 'Match ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportMatchId!: string;

  @ApiProperty({
    description: 'Bet Bet Condition ID',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betConditionId!: string;

  @ApiProperty({ type: () => BetConditionDTO })
  @IsDefined()
  @Type(() => BetConditionDTO)
  betCondition: BetConditionDTO;

  constructor(partial: Partial<SportsSportMatchBetCondtionDTO>) {
    super();
    Object.assign(this, partial);
  }
}
