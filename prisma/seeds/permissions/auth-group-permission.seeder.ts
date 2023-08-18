import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AuthGroupPermission from './jsons/auth-group-permission.json';

export const AuthGroupPermissionSeeder = async () => {
  AuthGroupPermission.forEach((type) => {
    UpsertAuthGroupPermission(type);
  });
};

export const UpsertAuthGroupPermission = async (type: any) => {
  try {
    const authGroupPersmissionData = await prisma.authGroupPersmission.upsert({
      where: { id: type.id },
      update: {
        groupId: type.groupId,
        permissionId: type.permissionId,
      },
      create: {
        id: type.id,
        groupId: type.groupId,
        permissionId: type.permissionId,
      },
    });

    console.log('bet type->', authGroupPersmissionData);
  } catch (error) {
    console.log('AuthGroupPermission Error: ', error);
  }
};

AuthGroupPermissionSeeder();
