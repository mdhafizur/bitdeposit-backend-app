// https://docs.nestjs.com/techniques/configuration#using-the-configservice

import {
  Logger,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from '@src/auth/auth.module';
import { _AdminModule as AdminModule } from '@src/admin/admin.module';
import { LoggerModule } from '@src/logger/logger.module';
import { CoreModule } from '@src/core/core.module';
import { TransactionsModule } from '@src/transactions/transactions.module';
import { UsersModule } from '@src/users/users.module';
import { MailsModule } from '@src/mails/mails.module';
import { SmsModule } from '@src/sms/sms.module';
import { AttachmentsModule } from '@src/attachments/attachments.module';
import { SportsModule } from '@src/sports/sports.module';
import { FilesModule } from '@src/files/files.module';
import { BetsModule } from '@src/bets/bets.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SentryModule } from './sentry/sentry.module';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import { AffiliatesModule } from '@src/affiliates/affiliates.module';
import { AgentsModule } from '@src/agents/agents.module';

import { PromotionsModule } from './promotions/promotions.module';
import { AccessTokenGuard } from './auth/common/guards';
import { SupportsModule } from './supports/supports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'staging')
          .default('development')
          .required(),
        PORT: Joi.number().default(3000),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CALLBACK_URL: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DNS,
      tracesSampleRate: 1.0,
      debug: true,
    }),
    CoreModule,
    AdminModule,
    AuthModule,
    LoggerModule,
    MailsModule,
    SmsModule,
    UsersModule,
    TransactionsModule,
    AttachmentsModule,
    BetsModule,
    SportsModule,
    FilesModule,
    NotificationsModule,
    AffiliatesModule,
    AgentsModule,
    PromotionsModule,
    SupportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
