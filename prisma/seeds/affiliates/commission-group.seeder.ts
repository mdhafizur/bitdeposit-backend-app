import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AffiliatesCommissionGroup from './jsons/commission-group.json';

export const AffiliatesCommissionGroupSeeder = async () => {
  AffiliatesCommissionGroup.forEach((type) => {
    UpsertCommissionGroup(type);
  });
};

export const UpsertCommissionGroup = async (type: any) => {
  const commissionGroupData = await prisma.affiliatesCommissionGroup.upsert({
    where: { id: type.id },
    update: {
      title: type.title,
    },
    create: {
      id: type.id,
      title: type.title,
    },
  });

  console.log('commissionGroup:', commissionGroupData);
};
AffiliatesCommissionGroupSeeder();
