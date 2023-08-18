import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import BetTypeJSON from './jsons/bet-type.json';

export const BetTypeSeeder = async () => {
  BetTypeJSON.forEach((type) => {
    UpsertType(type);
  });
};

export const UpsertType = async (type: any) => {
  const betTypeData = await prisma.betsBetType.upsert({
    where: { name: type.name },
    update: {
      name: type.name,
    },
    create: {
      id: type.id,
      name: type.name,
    },
  });

  console.log('bettype->', betTypeData);
};

BetTypeSeeder();
