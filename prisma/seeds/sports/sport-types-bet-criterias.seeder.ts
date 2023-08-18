import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import SportTypesBetCriterias from './jsons/sport-types-bet-ceiterias.json';

export const SportTypessBetCriteriasSeeder = async () => {
  SportTypesBetCriterias.forEach(async (type) => {
    await UpsertSportTypesBetCriterias(type);
  });
};

export const UpsertSportTypesBetCriterias = async (type: any) => {
  const data = await prisma.sportsSportTypeBetCriteria.upsert({
    where: { id: type.id },
    update: {},
    create: {
      id: type.id,
      sportTypeId: type.sportTypeId,
      betCriteriaId: type.betCriteriaId,
    },
  });
  console.log(data);
};

SportTypessBetCriteriasSeeder();
