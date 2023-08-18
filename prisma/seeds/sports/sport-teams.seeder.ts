import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import SportTeams from './jsons/sport-teams.json';

export const SportTeamsSeeder = async () => {
  SportTeams.forEach(async (type) => {
    await UpsertSportTeams(type);
  });
};

export const UpsertSportTeams = async (type: any) => {
  const data = await prisma.sportsSportTeam.upsert({
    where: { id: type.id },
    update: {},
    create: {
      id: type.id,
      name: type.name,
      sportTypeId: type.sportTypeId,
    },
  });
  console.log(data);
};

SportTeamsSeeder();
