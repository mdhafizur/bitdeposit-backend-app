import {
  PrismaClient,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import TransactionTypes from './jsons/transaction-types.json';

const methodTypeIds = TransactionTypes.map((type) => {
  return {
    transactionTypeId: type.id,
    transactionMethodId: type.transactionMethodId,
  };
});

const prisma = new PrismaClient();

const fakerTransaction = (): any => ({
  tranId: faker.random.alphaNumeric(10),
  tranType: faker.helpers.arrayElement(Object.values(TransactionTypeEnum)),
  tranStatus: faker.helpers.arrayElement(Object.values(TransactionStatusEnum)),
  amount: faker.datatype.float({ max: 500 }),
  coin: faker.datatype.float({ max: 500 }),
  userId: '425fde8b-ac30-441e-ab49-6f9b0e554905',
  betSiteUserAccountId: '34df4ebf-0b47-4da8-a732-3ba1a68a5bd8',
  transactionTypeId:
    methodTypeIds[faker.datatype.number({ min: 0, max: 2 })].transactionTypeId,
  transactionMethodId:
    methodTypeIds[faker.datatype.number({ min: 0, max: 2 })]
      .transactionMethodId,
});

export async function TransactionSeeder() {
  const fakerRounds = 50;
  console.log('Seeding...');
  /// --------- TransactionSeeder ---------------
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.transactionsTransaction.create({ data: fakerTransaction() });
  }
}

TransactionSeeder()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
