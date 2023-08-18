import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import UserTransactionAccounts from './jsons/user-transaction-accounts.json';

export const UsersTransactionAccountsSeeder = async () => {
  UserTransactionAccounts.forEach(async (account) => {
    await UpsertUsersTransactionAccount(account);
  });
};

export const UpsertUsersTransactionAccount = async (account: any) => {
  const usersTransactionAccount =
    await prisma.usersTransactionTypeUserAccount.upsert({
      where: { id: account.id },
      update: {
        id: account.id,
        title: account.title,
        value: account.value,
        metaData: account.metaData,
        createdById: account.createdById,
        transactionTypeId: account.transactionTypeId,
        userId: account.userId,
      },
      create: {
        id: account.id,
        title: account.title,
        value: account.value,
        metaData: account.metaData,
        createdById: account.createdById,
        transactionTypeId: account.transactionTypeId,
        userId: account.userId,
      },
    });
  console.log(usersTransactionAccount);
};

UsersTransactionAccountsSeeder();
