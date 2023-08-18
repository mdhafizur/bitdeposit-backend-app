import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AuthUserPermissionJSON from './jsons/auth-user-permission.json';

export const AuthUserPermissionSeeder = async () => {
  AuthUserPermissionJSON.forEach((type) => {
    UpsertAuthUserPermission(type);
  });
};

export const UpsertAuthUserPermission = async (type: any) => {
  const authUserPermissionData = await prisma.authUserPersmission.upsert({
    where: { id: type.id },
    update: {
      userId: type.userId,
      permissionId: type.permissionId,
    },
    create: {
      id: type.id,
      userId: type.userId,
      permissionId: type.permissionId,
    },
  });

  console.log('authUserPermissionData', authUserPermissionData);
};

AuthUserPermissionSeeder();
