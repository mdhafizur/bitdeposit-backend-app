import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AuthPermission from './jsons/auth-permission.json';

export const AuthPermissionSeeder = async () => {
  AuthPermission.forEach((type) => {
    UpsertAuthPermission(type);
  });
};

export const UpsertAuthPermission = async (type: any) => {
  try {
    const authPermissionData = await prisma.authPersmission.upsert({
      where: { id: type.id },
      update: {
        name: type.name,
        action: type.action,
        codename: type.codename,
        contentTypeId: type.contentTypeId,
      },
      create: {
        id: type.id,
        name: type.name,
        action: type.action,
        codename: type.codename,
        contentTypeId: type.contentTypeId,
      },
    });

    console.log('AuthPermission', authPermissionData);
  } catch (error) {
    console.log('AuthPermission Error', error);
  }
};
AuthPermissionSeeder();
