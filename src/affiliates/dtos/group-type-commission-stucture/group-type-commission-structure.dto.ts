import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseDTO } from '@src/core/dtos';
import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsUUID } from 'class-validator';

export class GroupTypeCommissionStructureDTO extends BaseDTO {
  @ApiProperty({
    description: 'id of a AuthGroupOwner Group Type.',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsUUID()
  authGroupOwnerGroupTypeId!: string;

  @ApiProperty({ type: Number })
  @IsDefined()
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
  bdPercentage!: Prisma.Decimal;

  @ApiProperty({ type: Number })
  @IsDefined()
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
  oneXPercentage!: Prisma.Decimal;

  @ApiProperty({ type: Number })
  @IsDefined()
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
  incomePercentage!: Prisma.Decimal;

  constructor(partial: Partial<GroupTypeCommissionStructureDTO>) {
    super();
    Object.assign(this, partial);
  }
}
