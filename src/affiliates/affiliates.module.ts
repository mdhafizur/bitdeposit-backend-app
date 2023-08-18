import { Module } from '@nestjs/common';
import {
  AffiliateTransactionsController,
  CommissionGroupsController,
  CommissionTypesController,
  GroupOwnerAffiliateController,
  GroupOwnerCommissionStructureController,
  GroupOwnerGroupTypesController,
  GroupOwnerUserController,
  GroupOwnersController,
  GroupTypeCommissionStructureController,
} from '@src/affiliates/controllers';
import {
  AffiliateTransactionsService,
  CommissionGroupsService,
  CommissionTypesService,
  GroupOwnerAffiliateService,
  GroupOwnerCommissionStructureService,
  GroupOwnerGroupTypesService,
  GroupOwnerUserService,
  GroupOwnersService,
  GroupTypeCommissionStructureService,
} from '@src/affiliates/services';

@Module({
  imports: [],
  controllers: [
    CommissionGroupsController,
    CommissionTypesController,
    GroupTypeCommissionStructureController,
    GroupOwnerAffiliateController,
    GroupOwnersController,
    GroupOwnerUserController,
    GroupOwnerGroupTypesController,
    GroupOwnerCommissionStructureController,
    AffiliateTransactionsController,
  ],
  providers: [
    CommissionGroupsService,
    CommissionTypesService,
    GroupTypeCommissionStructureService,
    GroupOwnerAffiliateService,
    GroupOwnersService,
    GroupOwnerUserService,
    GroupOwnerGroupTypesService,
    GroupOwnerCommissionStructureService,
    AffiliateTransactionsService,
  ],
})
export class AffiliatesModule {}
