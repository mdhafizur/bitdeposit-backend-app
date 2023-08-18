import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import BetsBetCriteria from './jsons/bet-bet-criteria.json';

export const BetsBetCriteriaSeeder = async () => {
  BetsBetCriteria.forEach((criteria) => {
    UpsertBetCriteria(criteria);
  });
};

export const UpsertBetCriteria = async (criteria: any) => {
  const betCriteriaData = await prisma.betsBetCriteria.upsert({
    where: { id: criteria.id },
    update: {
      name: criteria.name,
      code: criteria.code,
      displayName: criteria.displayName,
    },
    create: {
      id: criteria.id,
      name: criteria.name,
      code: criteria.code,
      displayName: criteria.displayName,
    },
  });

  console.log('bet criteria->', betCriteriaData);
};

BetsBetCriteriaSeeder();
