import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import BetTypeSportMatches from '../bets/jsons/bet-type-sport-match.json';

export const BetTypeSportMatchesSeeder = async () => {
  BetTypeSportMatches.forEach(async (type) => {
    await UpsertBetTypeSportMatches(type);
  });
};

export const UpsertBetTypeSportMatches = async (type: any) => {
  const data = await prisma.betsBetTypeSportMatch.upsert({
    where: { id: type.id },
    update: {
      betTypeId: type.betTypeId,
      sportMatchId: type.sportMatchId,
    },
    create: {
      id: type.id,
      betTypeId: type.betTypeId,
      sportMatchId: type.sportMatchId,
    },
  });
  console.log(data);
};

BetTypeSportMatchesSeeder();
