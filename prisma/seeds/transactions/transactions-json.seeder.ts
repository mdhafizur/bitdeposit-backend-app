import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import Transactions from './jsons/transactions.json';

export const TransactionsJsonSeeder = async () => {
  Transactions.forEach(async (transaction) => {
    await UpsertTransaction(transaction);
  });
};

export const UpsertTransaction = async (transaction: any) => {
  try {
    const transactionData = await prisma.transactionsTransaction.upsert({
      where: { id: transaction.id },
      update: {
        id: transaction.id,
        tranId: transaction.tranId,
        tranRefId: transaction.tranRefId,
        tranType: transaction.tranType,
        tranStatus: transaction.tranStatus,
        amount: transaction.amount,
        coin: transaction.coin,
        metaData: transaction.metaData,
        createdById: transaction.createdById,
        userId: transaction.createdById,
        betSiteUserAccountId: transaction.betSiteUserAccountId,
        transactionMethodId: transaction.transactionMethodId,
        transactionTypeId: transaction.transactionTypeId,
        transactionTypeAccountId: transaction.transactionTypeAccountId,
        userTransactionAccountId: transaction.userTransactionAccountId,
        senderId: transaction.senderId,
        receiverId: transaction.receiverId,
      },
      create: {
        id: transaction.id,
        tranId: transaction.tranId,
        tranRefId: transaction.tranRefId,
        tranType: transaction.tranType,
        tranStatus: transaction.tranStatus,
        amount: transaction.amount,
        coin: transaction.coin,
        metaData: transaction.metaData,
        createdById: transaction.createdById,
        userId: transaction.userId,
        betSiteUserAccountId: transaction.betSiteUserAccountId,
        transactionMethodId: transaction.transactionMethodId,
        transactionTypeId: transaction.transactionTypeId,
        transactionTypeAccountId: transaction.transactionTypeAccountId,
        userTransactionAccountId: transaction.userTransactionAccountId,
        senderId: transaction.senderId,
        receiverId: transaction.receiverId,
      },
    });
    console.log(transactionData);
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

TransactionsJsonSeeder();
