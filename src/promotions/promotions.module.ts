import { Module } from '@nestjs/common';

import {
  PromotionsGroupOwnerPromoCodesController,
  PromotionsGroupOwnerPromoUsersController,
} from './controllers';

import {
  PromotionGroupOwnerPromoUsersService,
  PromotionsGroupOwnerPromoCodesService,
} from './services';

@Module({
  imports: [],
  controllers: [
    PromotionsGroupOwnerPromoCodesController,
    PromotionsGroupOwnerPromoUsersController,
  ],
  providers: [
    PromotionsGroupOwnerPromoCodesService,
    PromotionGroupOwnerPromoUsersService,
  ],
})
export class PromotionsModule {}
