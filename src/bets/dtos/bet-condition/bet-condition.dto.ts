import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseDTO } from '@src/core/dtos';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class BetConditionDTO extends BaseDTO {
  @ApiProperty({
    description: 'Bet Condition title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Bet Condition code.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  code!: string;

  @ApiProperty({
    description: 'Bet Criteria display name.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  displayName?: string;

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

  constructor(partial: Partial<BetConditionDTO>) {
    super();
    Object.assign(this, partial);
  }
}
