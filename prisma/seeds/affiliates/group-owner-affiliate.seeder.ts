import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AffiliatesGroupOwnerAffiliate from './jsons/group-owner-affiliate.json';

export const AffiliatesGroupOwnerAffiliateSeeder = async () => {
  AffiliatesGroupOwnerAffiliate.forEach((type) => {
    UpsertGroupOwnerAffiliate(type);
  });
};

export const UpsertGroupOwnerAffiliate = async (type: any) => {
  const groupOwnerAffiliateData =
    await prisma.affiliatesGroupOwnerAffiliate.upsert({
      where: { id: type.id },
      update: {
        groupOwnerId: type.groupOwnerId,
        affiliateId: type.affiliateId,
      },
      create: {
        id: type.id,
        groupOwnerId: type.groupOwnerId,
        affiliateId: type.affiliateId,
      },
    });

  console.log('groupOwnerAffiliate:', groupOwnerAffiliateData);
};
AffiliatesGroupOwnerAffiliateSeeder();
