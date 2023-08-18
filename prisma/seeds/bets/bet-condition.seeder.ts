import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import BetsBetCondition from './jsons/bet-bet-condition.json';

export const BetsBetConditionSeeder = async () => {
  BetsBetCondition.forEach((condition) => {
    UpsertBetCondition(condition);
  });
};

export const UpsertBetCondition = async (condition: any) => {
  try {
    const betConditionData = await prisma.betsBetCondition.upsert({
      where: { id: condition.id },
      update: {
        name: condition.name,
        code: condition.code,
        displayName: condition.displayName,
        odd: condition.odd,
      },
      create: {
        id: condition.id,
        name: condition.name,
        code: condition.code,
        displayName: condition.displayName,
        odd: condition.odd,
      },
    });

    console.log('betcondition', betConditionData);
  } catch (error) {
    console.log('UpsertBetCondition', error);
  }
};
BetsBetConditionSeeder();
