import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import AuthUserGroupJSON from './jsons/auth-user-group.json';

export const AuthUserGroupSeeder = async () => {
  AuthUserGroupJSON.forEach((type) => {
    UpsertAuthUserGroup(type);
  });
};

export const UpsertAuthUserGroup = async (type: any) => {
  const authUserGroupData = await prisma.authUserGroup.upsert({
    where: { id: type.id },
    update: {
      groupId: type.groupId,
      userId: type.userId,
    },
    create: {
      id: type.id,
      groupId: type.groupId,
      userId: type.userId,
    },
  });

  console.log('authUserGroupData', authUserGroupData);
};
AuthUserGroupSeeder();
