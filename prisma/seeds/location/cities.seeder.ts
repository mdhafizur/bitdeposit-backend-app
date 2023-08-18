import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import CitiesJSON from './jsons/cities.json';

export const CitiesSeeder = async () => {
  CitiesJSON.forEach((city) => {
    UpsertCity(city);
  });
};

export const UpsertCity = async (city: any) => {
  const cityData = await prisma.locationsCity.upsert({
    where: { name: city.name },
    update: {},
    create: {
      id: city.id,
      name: city.name,
      countryId: city.country_id,
      stateId: city.state_id,
      metaData: city,
    },
  });
  console.log(cityData);
};
