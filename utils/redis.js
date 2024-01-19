import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', (err) => {
      console.log('Redis client not connected to the server:', err.toString());
    });

    this.client.on('connect', () => {});
  }

  isAlive() {
    return this.client.connnected;
  }

  async get(key) {
    return promisify(this.client.get).bind(this.client)(key);
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del(key) {
    return promisify(this.client.del).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
