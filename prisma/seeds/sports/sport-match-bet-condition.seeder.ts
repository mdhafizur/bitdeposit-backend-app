import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import SportMatchBetCriteriaBetConditions from './jsons/sport-match-bet-condition.json';

export const SportMatchBetConditionSeeder = async () => {
  SportMatchBetCriteriaBetConditions.forEach(async (type) => {
    await UpsertSportLeague(type);
  });
};

export const UpsertSportLeague = async (type: any) => {
  try {
    const data = await prisma.sportsSportMatchBetCondition.upsert({
      where: { id: type.id },
      update: {
        odd: type.odd,
        sportMatchId: type.sportMatchId,
        betConditionId: type.betConditionId,
      },
      create: {
        id: type.id,
        odd: type.odd,
        sportMatchId: type.sportMatchId,
        betConditionId: type.betConditionId,
      },
    });
    console.log(data);
  } catch (error) {
    console.log('UpsertSportLeague error:', error);
  }
};

SportMatchBetConditionSeeder();
