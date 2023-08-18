import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseDTO } from '@src/core/dtos';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class SportLeagueDTO extends BaseDTO {
  @ApiProperty({
    description: 'Sports League title.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Sports League Priority.',
    type: Number,
    required: true,
  })
  @IsOptional()
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
  leaguePriority!: Prisma.Decimal;

  @ApiProperty({
    description: 'Sports Type Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportTypeId!: string;

  @ApiProperty({
    description: 'Sports Category Id.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  sportCategoryId!: string;

  constructor(partial: Partial<SportLeagueDTO>) {
    super();
    Object.assign(this, partial);
  }
}
