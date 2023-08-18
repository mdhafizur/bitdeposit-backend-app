import { CACHE_MANAGER, Inject, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { NoDataFoundResponse } from '../constants';

export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getDataFromRedis(key: string) {
    try {
      const redisData: any = await this.cacheManager.get(key);

      if (redisData) {
        return {
          source: 'redis',
          type: key,
          data: redisData,
        };
      }

      return NoDataFoundResponse;
    } catch (error) {
      throw error;
    }
  }

  async setDataToRedis(key: string, data: any, duration: number) {
    try {
      const redisData = await this.cacheManager.set(key, data, {
        ttl: duration,
      });
      if (redisData === 'OK') {
        return {
          status: 'success',
          message: `Successfully set ${key} to redis!`,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteDataFromRedis(key: string) {
    const deletedData = await this.cacheManager.del(key);
    if (deletedData > 0) {
      return {
        status: 'success',
        message: `Successfully deleted ${key} from redis!`,
      };
    }

    throw new NotFoundException(`Could not delete ${key} from redis!`);
  }
}
