import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import TransactionAccounts from './jsons/transaction-accounts.json';

export const TransactionAccountsSeeder = async () => {
  TransactionAccounts.forEach(async (account) => {
    await UpsertTransactionAccount(account);
  });
};

export const UpsertTransactionAccount = async (account: any) => {
  const contactD = await prisma.transactionsTransactionTypeAccount.upsert({
    where: { id: account.id },
    update: {
      id: account.id,
      title: account.name,
      value: account.value,
      transactionTypeId: account.transactionTypeId,
    },
    create: {
      id: account.id,
      title: account.name,
      value: account.value,
      transactionTypeId: account.transactionTypeId,
    },
  });
  console.log(contactD);
};

TransactionAccountsSeeder();
