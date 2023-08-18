import { Module } from '@nestjs/common';
import {
  TransactionMethodsController,
  TransactionTypeAccountsController,
  TransactionsController,
} from './controllers';

import {
  TransactionMethodsService,
  TransactionTypeAccountsService,
  TransactionsService,
} from './services';
@Module({
  imports: [],
  controllers: [
    TransactionTypeAccountsController,
    TransactionMethodsController,
    TransactionsController,
  ],
  providers: [
    TransactionsService,
    TransactionTypeAccountsService,
    TransactionMethodsService,
  ],
})
export class TransactionsModule {}
