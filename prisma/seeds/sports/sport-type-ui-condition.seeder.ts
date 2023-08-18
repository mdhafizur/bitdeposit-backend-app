import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import SportTypeUICondition from './jsons/sport-type-ui-condition.json';

export const SportTypeUIConditionSeeder = async () => {
  SportTypeUICondition.forEach(async (type) => {
    await UpsertSportTypeUICondition(type);
  });
};

export const UpsertSportTypeUICondition = async (type: any) => {
  const data = await prisma.sportsSportTypeUICondition.upsert({
    where: { id: type.id },
    update: {
      sportTypeId: type.sportTypeId,
      sportUIConditionId: type.sportUIConditionId,
    },
    create: {
      id: type.id,
      sportTypeId: type.sportTypeId,
      sportUIConditionId: type.sportUIConditionId,
    },
  });
  console.log(data);
};

SportTypeUIConditionSeeder();
