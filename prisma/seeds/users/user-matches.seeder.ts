import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import UsersUserMatchesData from './jsons/user-matches.json';

export const UsersUserMatchesSeeder = async () => {
  UsersUserMatchesData.forEach(async (type) => {
    await UsersUserMatches(type);
  });
};

export const UsersUserMatches = async (type: any) => {
  const data = await prisma.usersUserMatch.upsert({
    where: { id: type.id },
    update: {},
    create: {
      id: type.id,
      sportMatchId: type.sportMatchId,
      userId: type.userId,
    },
  });
  console.log('user favourite matches-->', data);
};

UsersUserMatchesSeeder();
