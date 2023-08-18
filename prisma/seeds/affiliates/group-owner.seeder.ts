import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AffiliatesGroupOwner from './jsons/group-owner.json';

export const AffiliatesGroupOwnerSeeder = async () => {
  AffiliatesGroupOwner.forEach((type) => {
    UpsertGroupOwner(type);
  });
};

export const UpsertGroupOwner = async (type: any) => {
  try {
    const groupOwnerData = await prisma.affiliatesGroupOwner.upsert({
      where: { id: type.id },
      update: {
        title: type.title,
        groupId: type.groupId,
        ownerId: type.ownerId,
        authGroupOwnerGroupTypeId: type.authGroupOwnerGroupTypeId,
      },
      create: {
        id: type.id,
        title: type.title,
        groupId: type.groupId,
        ownerId: type.ownerId,
        authGroupOwnerGroupTypeId: type.authGroupOwnerGroupTypeId,
      },
    });

    console.log('groupOwner:', groupOwnerData);
  } catch (error) {
    console.log('group owner error:', error);
  }
};
AffiliatesGroupOwnerSeeder();
