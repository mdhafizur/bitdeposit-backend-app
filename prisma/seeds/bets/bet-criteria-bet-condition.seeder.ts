import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import BetsBetCriteriaBetCondition from './jsons/bet-bet-criteria-bet-condition.json';

export const BetsBetCriteriaBetConditionSeeder = async () => {
  BetsBetCriteriaBetCondition.forEach((criteria) => {
    UpsertBetCriteriaBetCondition(criteria);
  });
};

export const UpsertBetCriteriaBetCondition = async (
  betCriteriaBetCondition: any,
) => {
  try {
    const betCriteriaBetConditionData =
      await prisma.betsBetCriteriaBetCondition.upsert({
        where: { id: betCriteriaBetCondition.id },
        update: {
          betCriteriaId: betCriteriaBetCondition.betCriteriaId,
          betConditionId: betCriteriaBetCondition.betConditionId,
        },
        create: {
          id: betCriteriaBetCondition.id,
          betCriteriaId: betCriteriaBetCondition.betCriteriaId,
          betConditionId: betCriteriaBetCondition.betConditionId,
        },
      });

    console.log('criteriaBetCondition', betCriteriaBetConditionData);
  } catch (error) {
    console.log('BetsBetCriteriaBetConditionSeeder', error);
  }
};
BetsBetCriteriaBetConditionSeeder();
