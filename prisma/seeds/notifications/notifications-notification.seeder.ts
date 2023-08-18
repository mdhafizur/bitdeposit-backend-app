import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const fakerNotification = (): any => ({
  title: faker.name.jobTitle(),
  description: faker.random.word(),
  type: 'public',
});

export async function NotificationSeeder() {
  const fakerRounds = 50;
  console.log('Seeding...');
  /// --------- NotificationSeeder ---------------
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.notificationsNotification.create({
      data: fakerNotification(),
    });
  }
}

NotificationSeeder()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
