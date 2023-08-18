import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AffiliatesGroupOnwerGroupType from './jsons/group-owner-group-type.json';

export const AffiliatesGroupOnwerGroupTypeSeeder = async () => {
  AffiliatesGroupOnwerGroupType.forEach((type) => {
    UpsertGroupOnwerGroupType(type);
  });
};

export const UpsertGroupOnwerGroupType = async (type: any) => {
  const groupOnwerGroupTypeData =
    await prisma.affiliatesGroupOwnerGroupType.upsert({
      where: { id: type.id },
      update: {
        title: type.title,
      },
      create: {
        id: type.id,
        title: type.title,
      },
    });

  console.log('groupOnwerGroupType:', groupOnwerGroupTypeData);
};
AffiliatesGroupOnwerGroupTypeSeeder();
