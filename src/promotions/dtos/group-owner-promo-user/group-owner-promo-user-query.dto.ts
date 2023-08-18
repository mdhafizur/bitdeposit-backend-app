import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';

export class PromotionsGroupOwnerPromoUserQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Promo Code Id',
    type: String,
  })
  @IsOptional()
  @IsUUID()
  promotionId: string = undefined;

  @ApiPropertyOptional({
    description: 'user id.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  userId: string = undefined;
}
