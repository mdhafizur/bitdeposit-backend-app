import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsUUID } from 'class-validator';

export class GroupOwnerAffiliateDTO extends BaseDTO {
  @ApiProperty({
    description: 'id of a group owner.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  groupOwnerId!: string;

  @ApiProperty({
    description: 'id of a affiliate.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  affiliateId!: string;

  constructor(partial: Partial<GroupOwnerAffiliateDTO>) {
    super();
    Object.assign(this, partial);
  }
}
