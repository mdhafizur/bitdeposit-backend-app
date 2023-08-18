import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseDTO } from '@src/core/dtos';
import { TransactionMethodDTO } from '..';
import { TransactionsTransactionTypeCoinRateDTO } from '../transaction-type-coin-rate';

export class TransactionsTransactionTypeDTO extends BaseDTO {
  @ApiProperty({
    description: 'ID',
    type: String,
    required: false,
    format: 'uuid',
  })
  @IsDefined()
  @IsUUID()
  id: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  transactionMethodId?: string;

  @ApiProperty({ type: () => TransactionMethodDTO })
  @IsOptional()
  @Type(() => TransactionMethodDTO)
  transactionMethod?: string;

  @ApiPropertyOptional({ type: () => TransactionsTransactionTypeCoinRateDTO })
  @IsOptional()
  coinRates?: TransactionsTransactionTypeCoinRateDTO;

  constructor(partial: Partial<TransactionsTransactionTypeDTO>) {
    super();
    Object.assign(this, partial);
  }
}
