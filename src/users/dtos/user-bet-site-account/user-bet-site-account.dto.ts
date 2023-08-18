import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUUID } from 'class-validator';
import { BaseDTO } from '@src/core/dtos';
import { TransactionsTransactionDTO } from '@src/transactions/dtos';
import { UsersUserDTO } from '@src/users/dtos';
import { BetSiteAccountDTO } from '@src/bets/dtos';

export class UserBetSiteAccountDTO extends BaseDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  name!: string;

  @ApiProperty({ isArray: true, type: String })
  @IsDefined()
  @IsString()
  @IsUUID()
  userId!: string;

  @ApiProperty({ isArray: true, type: () => UsersUserDTO })
  @IsDefined()
  user!: UsersUserDTO[];

  @ApiProperty({ isArray: true, type: String })
  @IsDefined()
  @IsUUID()
  betSiteAccountId!: string;

  @ApiProperty({ isArray: true, type: () => BetSiteAccountDTO })
  @IsDefined()
  betSiteAccount!: BetSiteAccountDTO[];

  @ApiProperty({ isArray: true, type: () => TransactionsTransactionDTO })
  @IsDefined()
  transactions!: TransactionsTransactionDTO[];

  constructor(partial: Partial<UserBetSiteAccountDTO>) {
    super();
    Object.assign(this, partial);
  }
}
