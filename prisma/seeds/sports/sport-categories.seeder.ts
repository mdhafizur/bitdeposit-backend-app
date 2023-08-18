import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import SportCategories from './jsons/sport-categories.json';

export const SportCategoriesSeeder = async () => {
  SportCategories.forEach(async (item) => {
    await UpsertSportCategory(item);
  });
};

export const UpsertSportCategory = async (item: any) => {
  const data = await prisma.sportsSportCategory.upsert({
    where: { id: item.id },
    update: {
      name: item.name,
      sportTypeId: item.sportTypeId,
    },
    create: {
      id: item.id,
      name: item.name,
      sportTypeId: item.sportTypeId,
    },
  });
  console.log(data);
};

SportCategoriesSeeder();
