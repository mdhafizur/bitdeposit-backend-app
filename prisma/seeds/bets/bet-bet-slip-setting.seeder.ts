import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import BetSlipSettingJSON from './jsons/bet-bet-slip-setting.json';

export const BetSlipSettingSeeder = async () => {
  BetSlipSettingJSON.forEach((type) => {
    UpsertBetSlipSetting(type);
  });
};

export const UpsertBetSlipSetting = async (type: any) => {
  const betSlipSettingData = await prisma.betsBetSlipSetting.upsert({
    where: { id: type.id },
    update: {
      name: type.name,
    },
    create: {
      id: type.id,
      name: type.name,
    },
  });

  console.log('bet slip setting', betSlipSettingData);
};
