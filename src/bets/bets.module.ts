import { Module } from '@nestjs/common';

import {
  BetConditionsController,
  BetCriteriaBetConditionController,
  BetCriteriasController,
  BetSiteAccountsController,
  BetSiteController,
  BetSlipSettingsController,
  BetTypeSportTypeController,
  BetTypesController,
} from '@src/bets/controllers';
import {
  BetConditionsService,
  BetCriteriaBetConditionService,
  BetCriteriasService,
  BetSiteAccountsService,
  BetSiteService,
  BetSlipSettingsService,
  BetTypeSportTypeService,
  BetTypesService,
} from '@src/bets/services';

@Module({
  imports: [],
  controllers: [
    BetConditionsController,
    BetCriteriasController,
    BetTypesController,
    BetTypeSportTypeController,
    BetCriteriaBetConditionController,
    BetSlipSettingsController,
    BetSiteController,
    BetSiteAccountsController,
  ],
  providers: [
    BetTypesService,
    BetCriteriasService,
    BetConditionsService,
    BetTypeSportTypeService,
    BetCriteriaBetConditionService,
    BetSlipSettingsService,
    BetSiteService,
    BetSiteAccountsService,
  ],
})
export class BetsModule {}
