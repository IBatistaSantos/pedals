import Redis, { Redis as RedisClient } from 'ioredis';
import { cacheConfig } from '../../../../../config/cache';
import { ICacheProvider } from '../model/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }
  async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }
  async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
  async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

export { RedisCacheProvider };
