import { Module } from '@nestjs/common';
import {
  UsersController,
  UsersTransactionAccountsController,
  UsersUserBetSiteAccountController,
  UsersUserMatchBetController,
  UsersUserMatchesController,
} from './controllers';
import {
  UsersTransactionAccountsService,
  UsersUserBetSiteAccountService,
  UsersUserMatchBetService,
  UsersUserMatchesService,
  UsersUsersService,
} from './services';
@Module({
  imports: [],
  controllers: [
    UsersController,
    UsersUserMatchesController,
    UsersUserMatchBetController,
    UsersTransactionAccountsController,
    UsersUserBetSiteAccountController,
  ],
  providers: [
    UsersUsersService,
    UsersUserMatchesService,
    UsersUserMatchBetService,
    UsersTransactionAccountsService,
    UsersUserBetSiteAccountService,
  ],
})
export class UsersModule {}
