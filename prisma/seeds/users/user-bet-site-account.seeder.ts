import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import UserBetSiteAccount from './jsons/user-bet-site-account.json';

export const BetsBetSiteUserAccountSeeder = async () => {
  UserBetSiteAccount.forEach((userBetSiteAccount) => {
    UpsertUserBetSiteAccount(userBetSiteAccount);
  });
};

export const UpsertUserBetSiteAccount = async (userBetSiteAccount: any) => {
  const betSiteUserAccountData = await prisma.usersUserBetSiteAccount.upsert({
    where: { id: userBetSiteAccount.id },
    update: {
      name: userBetSiteAccount.name,
      betSiteAccountId: userBetSiteAccount.betSiteAccountId,
      userId: userBetSiteAccount.userId,
      metaData: userBetSiteAccount.metaData,
    },
    create: {
      id: userBetSiteAccount.id,
      name: userBetSiteAccount.name,
      betSiteAccountId: userBetSiteAccount.betSiteAccountId,
      userId: userBetSiteAccount.userId,
      metaData: userBetSiteAccount.metaData,
    },
  });
  console.log('UserBetSiteAccount', betSiteUserAccountData);
};

BetsBetSiteUserAccountSeeder();
