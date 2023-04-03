/**
 * Create a redis client class and some helper functions
 */

import { createClient } from 'redis';
import { promisify } from 'utils';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const asyncGet = promisify(this.client.get).bind(this.client);
    return asyncGet(key);
  }

  async set(key, value, duration) {
    const asyncSet = promisify(this.client.set).bind(this.client);
    await asyncSet(key, value, 'EX', duration);
  }

  async del(key) {
    const asyncDel = promisify(this.client.del).bind(this.client);
    await asyncDel(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
