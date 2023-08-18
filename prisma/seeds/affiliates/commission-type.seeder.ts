import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AffiliatesCommissionType from './jsons/commission-type.json';

export const AffiliatesCommissionTypeSeeder = async () => {
  AffiliatesCommissionType.forEach((type) => {
    UpsertCommissionType(type);
  });
};

export const UpsertCommissionType = async (type: any) => {
  const commissionTypeData = await prisma.affiliatesCommissionType.upsert({
    where: { id: type.id },
    update: {
      title: type.title,
    },
    create: {
      id: type.id,
      title: type.title,
    },
  });

  console.log('commissionType:', commissionTypeData);
};
AffiliatesCommissionTypeSeeder();
