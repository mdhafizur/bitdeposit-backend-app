import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import Users from './jsons/users-users.json';

export const UsersUserSeeder = async () => {
  Users.forEach(async (account) => {
    await UpsertUsersUser(account);
  });
};

export const UpsertUsersUser = async (account: any) => {
  const userData = await prisma.usersUser.upsert({
    where: { id: account.id },
    update: {
      email: account.email,
      password: account.password,
      firstName: account.firstName,
      lastName: account.lastName,
      userName: account.userName,
      createdById: account.createdById,
    },
    create: {
      id: account.id,
      email: account.email,
      password: account.password,
      firstName: account.firstName,
      lastName: account.lastName,
      userName: account.userName,
      createdById: account.createdById,
    },
  });
  console.log(userData);
};

UsersUserSeeder();
