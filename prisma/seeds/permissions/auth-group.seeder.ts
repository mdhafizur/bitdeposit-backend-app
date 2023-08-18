import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AuthGroup from './jsons/auth-group.json';

export const AuthGroupSeeder = async () => {
  AuthGroup.forEach((type) => {
    UpsertAuthGroup(type);
  });
};

export const UpsertAuthGroup = async (type: any) => {
  const authGroupData = await prisma.authGroup.upsert({
    where: { id: type.id },
    update: {
      name: type.name,
    },
    create: {
      id: type.id,
      name: type.name,
    },
  });

  console.log('authGroupData', authGroupData);
};
AuthGroupSeeder();
