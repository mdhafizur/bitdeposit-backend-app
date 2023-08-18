import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AffiliatesGroupTypeCommissionStructure from './jsons/group-type-commission-structure.json';

export const AffiliatesGroupTypeCommissionStructureSeeder = async () => {
  AffiliatesGroupTypeCommissionStructure.forEach((type) => {
    UpsertGroupTypeCommissionStructure(type);
  });
};

export const UpsertGroupTypeCommissionStructure = async (type: any) => {
  const groupTypeCommissionStructureData =
    await prisma.affiliatesGroupTypeCommissionStructure.upsert({
      where: { id: type.id },
      update: {
        bdPercentage: type.bdPercentage,
        oneXPercentage: type.oneXPercentage,
        incomePercentage: type.incomePercentage,
        authGroupOwnerGroupTypeId: type.authGroupOwnerGroupTypeId,
      },
      create: {
        id: type.id,
        bdPercentage: type.bdPercentage,
        oneXPercentage: type.oneXPercentage,
        incomePercentage: type.incomePercentage,
        authGroupOwnerGroupTypeId: type.authGroupOwnerGroupTypeId,
      },
    });

  console.log(
    'groupTypeCommissionStructure:',
    groupTypeCommissionStructureData,
  );
};
AffiliatesGroupTypeCommissionStructureSeeder();
