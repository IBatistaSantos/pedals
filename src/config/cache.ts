import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: string;
  config: {
    redis: RedisOptions;
  };
}

const cacheConfig: ICacheConfig = {
  driver: 'redis',
  config: {
    redis: {
      host: 'redis',
      port: 6379,
      password: undefined,
    },
  },
};

export { cacheConfig };
