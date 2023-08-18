import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import TransactionTypes from './jsons/transaction-types.json';

// console.log(TransactionTypes);
export const TransactionTypesSeeder = async () => {
  TransactionTypes.forEach(async (type) => {
    await UpsertTransactionType(type);
  });
};

export const UpsertTransactionType = async (type: any) => {
  const typeD = await prisma.transactionsTransactionType.upsert({
    where: { name: type.name },
    update: {
      id: type.id,
      transactionMethodId: type.transactionMethodId,
      name: type.name,
    },
    create: {
      id: type.id,
      transactionMethodId: type.transactionMethodId,
      name: type.name,
    },
  });
  console.log(typeD);
};

TransactionTypesSeeder();
