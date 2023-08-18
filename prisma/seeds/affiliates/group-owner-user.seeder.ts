import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AffiliatesGroupOwnerUser from './jsons/group-owner-user.json';

export const AffiliatesGroupOwnerUserSeeder = async () => {
  AffiliatesGroupOwnerUser.forEach((type) => {
    UpsertGroupOwnerUser(type);
  });
};

export const UpsertGroupOwnerUser = async (type: any) => {
  const groupOwnerUserData = await prisma.affiliatesGroupOwnerUser.upsert({
    where: { id: type.id },
    update: {
      groupOwnerId: type.groupOwnerId,
      userId: type.userId,
    },
    create: {
      id: type.id,
      groupOwnerId: type.groupOwnerId,
      userId: type.userId,
    },
  });

  console.log('groupOwnerUser:', groupOwnerUserData);
};
AffiliatesGroupOwnerUserSeeder();
