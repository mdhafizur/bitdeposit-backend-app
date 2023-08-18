// https://github.com/SoftwareBrothers/adminjs-example-app
import AdminJS from 'adminjs';
import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import * as AdminJSPrisma from '@adminjs/prisma';
import { DMMFClass } from '@prisma/client/runtime';
// import { ExpressCustomLoader } from './express-custom.loader';
import { CoreModule } from 'src/core/core.module';
import { PrismaService } from 'src/core/services/prisma.service';
import { base } from '@src/admin/theme';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import {
  AffiliatesLabels,
  AgentsLabels,
  AuthLabels,
  BetsLabels,
  LocationsLabels,
  NotificationsLabels,
  SportsLabels,
  TransactionsLabels,
  UsersLabels,
} from './labels';

const prisma = new PrismaClient();

const DEFAULT_ADMIN = {
  email: 'admin@softic.ai',
  password: 'softic.ai',
};

const authenticate = async (email: string, password: string) => {
  try {
    const user = await prisma.usersUser.findUnique({
      where: {
        userName: email,
      },
    });
    const isPasswordValid = await argon2.verify(user.password, password);

    if (isPasswordValid) {
      return Promise.resolve({
        email: email,
        password: password,
      });
    } else {
      if (
        email === DEFAULT_ADMIN.email &&
        password === DEFAULT_ADMIN.password
      ) {
        return Promise.resolve(DEFAULT_ADMIN);
      }
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
});

@Module({
  imports: [
    AdminModule.createAdminAsync({
      imports: [CoreModule],
      inject: [PrismaService],
      useFactory: async (prisma: PrismaService) => {
        const dmmf = (prisma as any)._baseDmmf as DMMFClass;
        return {
          adminJsOptions: {
            branding: {
              companyName: 'Bit Deposit Admin Site',
              softwareBrothers: false,
              logo: false, //'/your-logo-url/your-logo-file.png', // OR false to hide the default one
              base,
            },
            version: {
              admin: true,
              app: '1.0.0',
            },
            rootPath: '/admin',
            resources: [
              {
                resource: { model: dmmf.modelMap.UsersUser, client: prisma },
                options: {
                  navigation: { name: 'Users', icon: 'User' },
                  properties: {
                    metaData: { type: 'mixed' },
                    'metaData.settings.bgColor': { type: 'string' },
                    'metaData.settings.fontSize': { type: 'number' },
                    'metaData.settings.oddsFormat': { type: 'string' },
                    'metaData.settings.notification': { type: 'array' },
                  },
                  // properties: {
                  //   metaData: {
                  //     isVisible: {
                  //       edit: false,
                  //       show: false,
                  //       list: false,
                  //       filter: false,
                  //     },
                  //   },
                  // },
                  actions: {
                    edit: { isAccessible: true },
                    delete: { isAccessible: false },
                    new: { isAccessible: false },
                  },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.UsersLocation,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Users', icon: 'Tree' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AuthVerificationToken,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Users', icon: 'Tree' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.UsersSetting,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Users', icon: 'Tree' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.UsersUserAttachment,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Users', icon: 'Tree' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.UsersTransactionTypeUserAccount,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Users', icon: 'Tree' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.UsersUserBetSiteAccount,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Users', icon: 'Tree' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.UsersUserMatch,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Users', icon: 'Tree' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.UsersUserMatchBet,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Users', icon: 'Tree' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AuthContentType,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Auth', icon: 'ManageProtection' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AuthGroup,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Auth', icon: 'ManageProtection' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AuthUserGroup,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Auth', icon: 'ManageProtection' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AuthPersmission,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Auth', icon: 'ManageProtection' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AuthGroupPersmission,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Auth', icon: 'ManageProtection' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AuthUserPersmission,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Auth', icon: 'ManageProtection' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AuthUserAuthenticationProvider,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Auth', icon: 'ManageProtection' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AuthRefreshToken,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Auth', icon: 'ManageProtection' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AffiliatesGroupOwner,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Affiliates', icon: 'Group' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AffiliatesGroupOwnerGroupType,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Affiliates', icon: 'Group' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AffiliatesGroupOwnerUser,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Affiliates', icon: 'Group' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AffiliatesCommissionGroup,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Affiliates', icon: 'Group' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AffiliatesCommissionType,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Affiliates', icon: 'Group' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AffiliatesGroupTypeCommissionStructure,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Affiliates', icon: 'Group' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AffiliatesGroupOwnerAffiliate,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Affiliates', icon: 'Group' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AffiliatesGroupOwnerCommissionStructure,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Affiliates', icon: 'Group' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AffiliatesAffiliateTransaction,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Affiliates', icon: 'Group' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.TransactionsTransactionMethod,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Transactions', icon: 'Finance' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.TransactionsTransactionType,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Transactions', icon: 'Finance' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.TransactionsTransactionTypeCoinRate,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Transactions', icon: 'Finance' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.TransactionsTransactionTypeAccount,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Transactions', icon: 'Finance' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.TransactionsTransaction,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Transactions', icon: 'Finance' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.SportsSportType,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Sports', icon: 'Trophy' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.SportsUICondition,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Sports', icon: 'Trophy' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.SportsSportTypeUICondition,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Sports', icon: 'Trophy' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.SportsSportCategory,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Sports', icon: 'Trophy' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.SportsSportTeam,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Sports', icon: 'Trophy' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.SportsSportLeague,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Sports', icon: 'Trophy' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.SportsSportMatch,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Sports', icon: 'Trophy' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.SportsSportMatchBetCondition,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Sports', icon: 'Trophy' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.BetsBetSite,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Bets', icon: 'Money' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.BetsBetSiteAccount,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Bets', icon: 'Money' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.BetsBetType,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Bets', icon: 'Money' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.BetsBetTypeSportType,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Bets', icon: 'Money' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.BetsBetTypeSportMatch,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Bets', icon: 'Money' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.BetsBetCriteria,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Bets', icon: 'Money' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.BetsBetCondition,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Bets', icon: 'Money' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.BetsBetCriteriaBetCondition,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Bets', icon: 'Money' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.BetsBetSlipSetting,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Bets', icon: 'Money' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.NotificationsNotification,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Notfications', icon: 'Notification' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.AgentsTransaction,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Agents', icon: 'Notification' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.NotificationsNotificationDetail,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Notfications', icon: 'Notification' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.LocationsCountry,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Locations', icon: 'Location' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.LocationsState,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Locations', icon: 'Location' },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.LocationsCity,
                  client: prisma,
                },
                options: {
                  navigation: { name: 'Locations', icon: 'Location' },
                },
              },
            ],
            locale: {
              language: 'en',
              translations: {
                messages: {
                  loginWelcome: 'Administration Panel - Login', // the smaller text
                },
                labels: {
                  loginWelcome: 'Welcome to Bit Deposit Admin Site', // this could be your project name
                  ...AuthLabels,
                  ...AffiliatesLabels,
                  ...AgentsLabels,
                  ...BetsLabels,
                  ...LocationsLabels,
                  ...NotificationsLabels,
                  ...TransactionsLabels,
                  ...SportsLabels,
                  ...UsersLabels,
                },
              },
            },
            // assets: {
            //   styles: ['/css/your-custom-styles.css'], // here you can hide the default images and re-position the boxes or text.
            // },
          },
          auth: {
            authenticate,
            cookieName: 'admin@softic.ai',
            cookiePassword: 'softic.ai',
          },
          sessionOptions: {
            resave: false,
            saveUninitialized: false,
            secret: 'softic.ai',
          },
        };
      },
      // customLoader: ExpressCustomLoader,
    }),
  ],
})
export class _AdminModule {}
