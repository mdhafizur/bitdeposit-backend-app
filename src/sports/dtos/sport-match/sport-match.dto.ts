import { ApiProperty } from '@nestjs/swagger';
import { MatchStatusEnum, Prisma } from '@prisma/client';
import { BaseDTO } from '@src/core/dtos';
import { getEnumValues } from '@src/core/helpers';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { SportLeagueDTO } from '../sport-league';

export class SportMatchDTO extends BaseDTO {
  @ApiProperty({
    description: 'Sports Match title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Sports Team One Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  teamOneId!: string;

  @ApiProperty({
    description: 'Sports Team Two Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  teamTwoId!: string;

  @ApiProperty({
    description: 'Match Priority.',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @Transform(
    ({ value }) => {
      if (!value) return value;
      if (value.d[1] !== undefined)
        return Number(`${value.d[0]}.${value.d[1]}`);
      return Number(`${value.d[0]}`);
    },
    {
      toPlainOnly: true,
    },
  )
  matchPriority!: Prisma.Decimal;

  @ApiProperty({
    description: 'Sports Match Status.',
    type: String,
    required: true,
  })
  @IsString()
  @IsIn(getEnumValues(MatchStatusEnum))
  matchStatus!: MatchStatusEnum;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  sportLeagueId!: string;

  @ApiProperty({ type: () => SportLeagueDTO })
  @IsDefined()
  @Type(() => SportLeagueDTO)
  sportLeague!: SportLeagueDTO;

  constructor(partial: Partial<SportMatchDTO>) {
    super();
    Object.assign(this, partial);
  }
}
