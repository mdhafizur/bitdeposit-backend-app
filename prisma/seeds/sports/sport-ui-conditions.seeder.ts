import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import SportUIConditions from './jsons/sport-ui-conditions.json';

export const SportUIConditionsSeeder = async () => {
  SportUIConditions.forEach(async (condition) => {
    await UpsertSportUICondition(condition);
  });
};

export const UpsertSportUICondition = async (condition: any) => {
  const data = await prisma.sportsUICondition.upsert({
    where: { id: condition.id },
    update: {
      name: condition.name,
      code: condition.code,
      displayName: condition.displayName,
    },
    create: {
      id: condition.id,
      name: condition.name,
      code: condition.code,
      displayName: condition.displayName,
    },
  });
  console.log(data);
};

SportUIConditionsSeeder();
