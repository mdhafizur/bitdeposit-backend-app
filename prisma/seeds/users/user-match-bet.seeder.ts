import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import UserMatchBet from './jsons/user-match-bet.json';

export const UsersUserMatchBetSeeder = async () => {
  UserMatchBet.forEach((usersUserMatchBet) => {
    UpsertUsersUserMatchBet(usersUserMatchBet);
  });
};

export const UpsertUsersUserMatchBet = async (usersUserMatchBet) => {
  // const usersUserMatchBetData = await prisma.usersUserMatchBet.upsert({
  //   where: { id: usersUserMatchBet.id },
  //   update: {},
  //   create: {
  //     id: usersUserMatchBet.id,
  //     userId: usersUserMatchBet.userId,
  //     betTypeId: usersUserMatchBet.betTypeId,
  //     sportMatchId: usersUserMatchBet.sportMatchId,
  //     sportMatchbetCriteriaBetConditionId:
  //       usersUserMatchBet.sportMatchbetCriteriaBetConditionId,
  //     betSlipSettingId: usersUserMatchBet.betSlipSettingId,
  //     overallOdd: usersUserMatchBet.overallOdd,
  //     stake: usersUserMatchBet.stake,
  //     winback: usersUserMatchBet.winback,
  //     betStatus: usersUserMatchBet.betStatus,
  //   },
  // });
  // console.log('user match bet=>', usersUserMatchBetData);
};
