import { Module } from '@nestjs/common';
import {
  SportCategoriesController,
  SportLeaguesController,
  SportMatchesController,
  SportTeamsController,
  SportTypeBetCriteriasController,
  SportsSportMatchBetConditionController,
  SportsTypesController,
} from '@src/sports/controllers';
import {
  SportCategoriesService,
  SportLeaguesService,
  SportMatchesService,
  SportTeamsService,
  SportTypeBetCriteriaService,
  SportTypesService,
  SportsSportMatchBetConditionService,
} from '@src/sports/services';
@Module({
  imports: [],
  controllers: [
    SportCategoriesController,
    SportLeaguesController,
    SportMatchesController,
    SportTeamsController,
    SportsTypesController,
    SportsSportMatchBetConditionController,
    SportTypeBetCriteriasController,
  ],
  providers: [
    SportCategoriesService,
    SportLeaguesService,
    SportMatchesService,
    SportTeamsService,
    SportTypesService,
    SportsSportMatchBetConditionService,
    SportTypeBetCriteriaService,
  ],
})
export class SportsModule {}
