import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import TransactionMethods from './jsons/transaction-methods.json';

export const TransactionMethodsSeeder = async () => {
  TransactionMethods.forEach(async (method) => {
    await UpsertTransactionMethod(method);
  });
};

export const UpsertTransactionMethod = async (method: any) => {
  try {
    const methodD = await prisma.transactionsTransactionMethod.upsert({
      where: { id: method.id },
      update: {
        id: method.id,
        name: method.name,
      },
      create: {
        id: method.id,
        name: method.name,
      },
    });
    console.log(methodD);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email',
        );
      }
    }
    throw error;
  }
};

TransactionMethodsSeeder();
