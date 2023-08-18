import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class BetCriteriaDTO extends BaseDTO {
  @ApiProperty({
    description: 'Bet Criteria title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Bet Criteria code.',
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
  displayName!: string;

  @ApiProperty({
    description: 'Bet Criteria isLocked',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  isLocked!: boolean;

  @ApiProperty({
    description: 'Bet Criteria isVisible',
    type: Boolean,
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  isVisible!: boolean;

  constructor(partial: Partial<BetCriteriaDTO>) {
    super();
    Object.assign(this, partial);
  }
}
