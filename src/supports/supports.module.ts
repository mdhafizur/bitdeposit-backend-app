import { Module } from '@nestjs/common';
import {
  CallbackRequestsController,
  ContactsController,
  EmailsController,
  SocialMessagingsController,
} from './controllers';
import {
  CallbackRequestsService,
  ContactsService,
  EmailsService,
  SocialMessagingsService,
} from './services';

@Module({
  imports: [],
  controllers: [
    EmailsController,
    ContactsController,
    SocialMessagingsController,
    CallbackRequestsController,
  ],
  providers: [
    EmailsService,
    ContactsService,
    SocialMessagingsService,
    CallbackRequestsService,
  ],
})
export class SupportsModule {}
