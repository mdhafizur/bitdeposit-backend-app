import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import StatesJSON from './jsons/states.json';

export const StatesSeeder = async () => {
  StatesJSON.forEach((state) => {
    UpsertState(state);
  });
};

export const UpsertState = async (state: any) => {
  const stateData = await prisma.locationsState.upsert({
    where: { name: state.name },
    update: {},
    create: {
      id: state.id,
      name: state.name,
      code: state.state_code,
      countryId: state.country_id,
      metaData: state,
    },
  });
  console.log(stateData);
};

// StatesSeeder();
