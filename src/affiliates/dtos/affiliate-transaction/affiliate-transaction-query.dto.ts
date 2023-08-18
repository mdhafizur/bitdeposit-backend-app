import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
export class AffiliateTransactionQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'id of a transaction.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  transactionId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Payout Status',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  paidOut?: boolean = undefined;

  @ApiPropertyOptional({
    description: 'id of a primary user.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  primaryUserId?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of Level 1 user.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  level1UserId?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of level 2 user.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  level2UserId?: string = undefined;
}
