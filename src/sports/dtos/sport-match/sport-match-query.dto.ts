import { ApiPropertyOptional } from '@nestjs/swagger';
import { MatchStatusEnum, Prisma } from '@prisma/client';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
import { getEnumValues } from '@src/core/helpers';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class SportMatchQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Sports Match title.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string = undefined;

  @ApiPropertyOptional({
    description: 'Sports Team One Id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  teamOneId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Sports Team Two Id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  teamTwoId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Match Priority.',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  matchPriority?: Prisma.Decimal = undefined;

  @ApiPropertyOptional({
    description: 'Sports Match Status.',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  @IsIn(getEnumValues(MatchStatusEnum))
  matchStatus?: MatchStatusEnum = undefined;

  @ApiPropertyOptional({
    description: 'Sports league id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  sportLeagueId?: string = undefined;

  @ApiPropertyOptional({
    description: 'Bet type id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  betTypeId?: string = undefined;

  @ApiPropertyOptional({
    description: 'User id.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userId?: string = undefined;
}
