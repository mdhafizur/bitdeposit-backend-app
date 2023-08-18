import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';

export class PromotionsAuthGroupOwnerPromoCodeQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'PromoCode Title',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  title?: string = undefined;

  @ApiPropertyOptional({
    description: 'PromoCode Title',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  code?: string = undefined;

  @ApiPropertyOptional({
    description: 'Group Owner ID',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsUUID()
  groupOwnerId: string = undefined;
}
