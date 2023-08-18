import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from '@src/core/dtos';
export class GroupOwnerQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'Title of Commission group.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of a group.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  groupId?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of a group owner.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  ownerId?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of a group-owner group-type.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  authGroupOwnerGroupTypeId?: string = undefined;

  @ApiPropertyOptional({
    description: 'id of a AuthGroupOwner Group Type.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userId?: string = undefined;
}
