import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import SportTypes from './jsons/sport-types.json';

export const SportTypesSeeder = async () => {
  SportTypes.forEach(async (type) => {
    await UpsertSportType(type);
  });
};

export const UpsertSportType = async (type: any) => {
  const data = await prisma.sportsSportType.upsert({
    where: { name: type.name },
    update: {
      id: type.id,
      name: type.name,
    },
    create: {
      id: type.id,
      name: type.name,
    },
  });
  console.log(data);
};

SportTypesSeeder();
