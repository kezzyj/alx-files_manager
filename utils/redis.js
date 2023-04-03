/**
 * Create a redis client class and some helper functions
 */

import {
  createClient,
} from 'redis';
import {
  promisify,
} from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log(err.message);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const getAsyncfunc = promisify(this.client.get).bind(this.client);
    return getAsyncfunc(key);
  }

  async set(key, value, duration) {
    const setAsyncfunc = promisify(this.client.set).bind(this.client);
    return setAsyncfunc(key, value, 'EX', duration);
  }

  async del(key) {
    const delAsyncfunc = promisify(this.client.del).bind(this.client);
    return delAsyncfunc(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
