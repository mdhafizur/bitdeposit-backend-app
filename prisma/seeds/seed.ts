import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // await UsersUserSeeder();

  await prisma.betsBetSite.upsert({
    where: { name: '1X Bet' },
    update: {
      id: '34df4ebf-0b47-4da8-a732-3ba1a68a5bd8',
      name: '1X Bet',
      code: '1xbet',
      url: 'www.1xbet.com',
    },
    create: {
      id: '34df4ebf-0b47-4da8-a732-3ba1a68a5bd8',
      name: '1X Bet',
      code: '1xbet',
      url: 'www.1xbet.com',
    },
  });

  await prisma.betsBetSite.upsert({
    where: { name: 'Bet 365' },
    update: {
      id: 'f302636a-f91a-40bf-a91a-c9d9a2665869',
      name: 'Bet 365',
      url: 'www.bet365.com',
      code: 'bet365',
    },
    create: {
      id: 'f302636a-f91a-40bf-a91a-c9d9a2665869',
      name: 'Bet 365',
      url: 'www.bet365.com',
      code: 'bet365',
    },
  });

  // console.log({ hafiz, shovon });
  // await CountriesSeeder();
  // await TransactionMethodsSeeder();
  // await TransactionTypesSeeder();
  // await TransactionSeeder();

  // const promises = [
  //   BetTypeSeeder(),
  //   SportTypesSeeder(),
  //   SportCategoriesSeeder(),
  //   SportTypesSportCategoriesSeeder(),
  //   BetSlipSettingSeeder(),
  //   BetsBetCriteriaSeeder(),
  //   BetsBetConditionSeeder(),
  //   BetsBetCriteriaBetConditionSeeder(),
  //   SportTypesSeeder(),
  //   BetsBetTypeSportTypeSeeder(),
  //   SportCategoriesSeeder(),
  //   SportLeaguesSeeder(),
  //   SportTeamsSeeder(),
  //   SportMatchesSeeder(),
  //   BetsSportMatchBetCriteriaSeeder(),
  //   SportLeaguesSportMatchesSeeder(),
  //   SportCategoriesBetCriteriasSeeder(),
  //   BetsUserMatchBetSeeder(),
  //   SportsUserMatchesSeeder(),
  // ];

  // Promise.all(promises)
  //   .then(() => {})
  //   .catch((error) => console.log(error));

  // await BetsBetSiteSeeder();
  // await BetsBetSiteUserAccountSeeder();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
