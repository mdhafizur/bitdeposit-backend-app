import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import BetsBetTypeSportType from './jsons/bet-bet-type-sport-type.json';

export const BetsBetTypeSportTypeSeeder = async () => {
  BetsBetTypeSportType.forEach((betTypeSportType) => {
    UpsertBetsBetTypeSportType(betTypeSportType);
  });
};

export const UpsertBetsBetTypeSportType = async (betTypeSportType: any) => {
  try {
    const betTypeSportTypeData = await prisma.betsBetTypeSportType.upsert({
      where: { id: betTypeSportType.id },
      update: {
        betTypeId: betTypeSportType.betTypeId,
        sportTypeId: betTypeSportType.sportTypeId,
      },
      create: {
        id: betTypeSportType.id,
        betTypeId: betTypeSportType.betTypeId,
        sportTypeId: betTypeSportType.sportTypeId,
      },
    });
    console.log('betTypeSportType', betTypeSportTypeData);
  } catch (error) {
    console.log('UpsertBetsBetTypeSportType error:', error);
  }
};

BetsBetTypeSportTypeSeeder();
