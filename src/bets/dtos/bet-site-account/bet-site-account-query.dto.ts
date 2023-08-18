import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
import { Transform } from 'class-transformer';

export class BetSiteAccountQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Bet Site Account Name',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  accountName: string = undefined;

  @ApiPropertyOptional({
    description: 'Bet Site Account id',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  accountId: string = undefined;

  @ApiPropertyOptional({
    description: 'Bet Site  id',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  betSiteId: string = undefined;

  @ApiPropertyOptional({
    description: 'if the account is assigned to an user or not',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isAssigned = undefined;
}
