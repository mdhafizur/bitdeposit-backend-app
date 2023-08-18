import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import SportMatches from './jsons/sport-matches.json';

export const SportMatchesSeeder = async () => {
  SportMatches.forEach(async (type) => {
    await UpsertSportMatchesSeeder(type);
  });
};

export const UpsertSportMatchesSeeder = async (type: any) => {
  const data = await prisma.sportsSportMatch.upsert({
    where: { id: type.id },
    update: {
      id: type.id,
      name: type.name,
      teamOneId: type.teamOneId,
      teamTwoId: type.teamTwoId,
      matchPriority: type.matchPriority,
      matchStatus: type.matchStatus,
      sportLeagueId: type.sportLeagueId,
    },
    create: {
      id: type.id,
      name: type.name,
      teamOneId: type.teamOneId,
      teamTwoId: type.teamTwoId,
      matchPriority: type.matchPriority,
      matchStatus: type.matchStatus,
      sportLeagueId: type.sportLeagueId,
    },
  });
  console.log(data);
};

SportMatchesSeeder();
