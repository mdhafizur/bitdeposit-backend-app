import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import CountriesJSON from './jsons/countries.json';

// console.log(CountriesJSON);
export const CountriesSeeder = async () => {
  CountriesJSON.forEach((country) => {
    UpsertCountry(country);
  });
};

export const UpsertCountry = async (country: any) => {
  const countryD = await prisma.locationsCountry.upsert({
    where: { name: country.name },
    update: {
      id: country.id,
      name: country.name,
      code: country.iso3,
      metaData: country,
    },
    create: {
      id: country.id,
      name: country.name,
      code: country.iso3,
      metaData: country,
    },
  });
  console.log(countryD);
};

// CountriesSeeder();
