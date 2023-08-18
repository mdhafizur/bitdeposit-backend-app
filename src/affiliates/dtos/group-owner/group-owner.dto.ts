import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/core/dtos';
import { IsDefined, IsString, IsUUID } from 'class-validator';

export class GroupOwnerDTO extends BaseDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'id of a group.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  groupId!: string;

  @ApiProperty({
    description: 'id of a owner.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  ownerId!: string;

  @ApiProperty({
    description: 'id of a group-owner group-type.',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsDefined()
  @IsUUID()
  authGroupOwnerGroupTypeId!: string;

  constructor(partial: Partial<GroupOwnerDTO>) {
    super();
    Object.assign(this, partial);
  }
}
