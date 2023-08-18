import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUUID } from 'class-validator';
import { BaseDTO } from '@src/core/dtos';
import { UserBetSiteAccountDTO } from '@src/users/dtos';

export class BetSiteAccountDTO extends BaseDTO {
  @ApiProperty({
    description: 'Bet Site Account Name',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  accountName!: string;

  @ApiProperty({
    description: 'Bet Site Account id',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  accountId!: string;

  @ApiProperty({
    description: 'Bet Site  id',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsDefined()
  @IsUUID()
  betSiteId!: string;

  @ApiProperty({
    description: 'user associated details',
    isArray: true,
    type: () => UserBetSiteAccountDTO,
  })
  @IsDefined()
  user!: UserBetSiteAccountDTO[];

  constructor(partial: Partial<BetSiteAccountDTO>) {
    super();
    Object.assign(this, partial);
  }
}
