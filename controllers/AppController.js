import DBClient from '../utils/db';
import RedisClient from '../utils/redis';

class AppController {
  static async getStatus() {
    const redisStatus = await RedisClient.isAlive();
    const dbStatus = await DBClient.isAlive();
    return { redis: redisStatus, db: dbStatus };
  }

  static async getNbUsers() {
    const nbUsers = await DBClient.nbUsers();
    return nbUsers;
  }

  static async getNbFiles() {
    const nbFiles = await DBClient.nbFiles();
    return nbFiles;
  }

  static async isRedisAlive() {
    return RedisClient.isAlive();
  }

  static async isDBAlive() {
    return DBClient.isAlive();
  }
}

export default AppController;
