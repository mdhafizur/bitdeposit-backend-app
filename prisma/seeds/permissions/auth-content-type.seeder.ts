import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AuthContentTypeJSON from './jsons/auth-content-type.json';

export const AuthContentTypeSeeder = async () => {
  AuthContentTypeJSON.forEach((type) => {
    UpsertAuthContentType(type);
  });
};

export const UpsertAuthContentType = async (type: any) => {
  const authContentTypeData = await prisma.authContentType.upsert({
    where: { id: type.id },
    update: {
      appLabel: type.appLabel,
      model: type.model,
    },
    create: {
      id: type.id,
      appLabel: type.appLabel,
      model: type.model,
    },
  });

  console.log('bet slip setting', authContentTypeData);
};

AuthContentTypeSeeder();
