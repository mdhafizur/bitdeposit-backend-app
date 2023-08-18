import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import BetsBetSite from './jsons/bets-bet-site.json';

export const BetsBetSiteSeeder = async () => {
  BetsBetSite.forEach((betSite) => {
    UpsertBetsBetSite(betSite);
  });
};

export const UpsertBetsBetSite = async (betSite: any) => {
  const betSiteData = await prisma.betsBetSite.upsert({
    where: { id: betSite.id },
    update: {
      name: betSite.name,
      url: betSite.url,
      code: betSite.code,
    },
    create: {
      id: betSite.id,
      name: betSite.name,
      url: betSite.url,
      code: betSite.code,
    },
  });
  console.log('betSite', betSiteData);
};
//calling
// BetsBetSiteSeeder();
