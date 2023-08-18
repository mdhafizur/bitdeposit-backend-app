import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AffiliatesGroupOnwerCommissionStructure from './jsons/group-owner-commission-structure.json';

export const AffiliatesGroupOnwerCommissionStructureSeeder = async () => {
  AffiliatesGroupOnwerCommissionStructure.forEach((type) => {
    UpsertGroupOnwerCommissionStructure(type);
  });
};

export const UpsertGroupOnwerCommissionStructure = async (type: any) => {
  const groupOnwerCommissionStructureData =
    await prisma.affiliatesGroupOwnerCommissionStructure.upsert({
      where: { id: type.id },
      update: {
        bdPercentage: type.bdPercentage,
        oneXPercentage: type.oneXPercentage,
        incomePercentage: type.incomePercentage,
        commissionGroupId: type.commissionGroupId,
        authGroupOwnerId: type.authGroupOwnerId,
      },
      create: {
        id: type.id,
        bdPercentage: type.bdPercentage,
        oneXPercentage: type.oneXPercentage,
        incomePercentage: type.incomePercentage,
        commissionGroupId: type.commissionGroupId,
        authGroupOwnerId: type.authGroupOwnerId,
      },
    });

  console.log(
    'groupOnwerCommissionStructure:',
    groupOnwerCommissionStructureData,
  );
};
AffiliatesGroupOnwerCommissionStructureSeeder();
