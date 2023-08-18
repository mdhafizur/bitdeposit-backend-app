import { BaseDTO } from '@src/core/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { TransactionsTransactionTypeDTO } from '../transaction-type/transaction-type.dto';

export class TransactionMethodDTO extends BaseDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ isArray: true, type: () => TransactionsTransactionTypeDTO })
  @IsOptional()
  @Type(() => TransactionsTransactionTypeDTO)
  transactionTypes!: TransactionsTransactionTypeDTO[];

  constructor(partial: Partial<TransactionMethodDTO>) {
    super();
    Object.assign(this, partial);
  }
}
