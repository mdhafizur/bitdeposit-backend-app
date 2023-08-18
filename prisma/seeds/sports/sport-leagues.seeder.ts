import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import SportLeagues from './jsons/sport-leagues.json';

export const SportLeaguesSeeder = async () => {
  SportLeagues.forEach(async (type) => {
    await UpsertSportLeague(type);
  });
};

export const UpsertSportLeague = async (type: any) => {
  const data = await prisma.sportsSportLeague.upsert({
    where: { id: type.id },
    update: {
      id: type.id,
      name: type.name,
      leaguePriority: type.leaguePriority,
      sportTypeId: type.sportTypeId,
      sportCategoryId: type.sportCategoryId,
    },
    create: {
      id: type.id,
      name: type.name,
      leaguePriority: type.leaguePriority,
      sportTypeId: type.sportTypeId,
      sportCategoryId: type.sportCategoryId,
    },
  });
  console.log(data);
};

SportLeaguesSeeder();
