/*
 * Create the client part with mongo db
 */

import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  isAlive = async () => {
    try {
      await this.client.connect();
      await this.client.db().admin().ping();
      return true;
    } catch (error) {
      return false;
    }
  };

  nbUsers = async () => {
    try {
      await this.client.connect();
      const usersCollection = this.client.db().collection('users');
      const nbUsers = await usersCollection.countDocuments();
      return nbUsers;
    } catch (error) {
      return error;
    }
  };

  nbFiles = async () => {
    try {
      await this.client.connect();
      const filesCollection = this.client.db().collection('files');
      const nbFiles = await filesCollection.countDocuments();
      return nbFiles;
    } catch (error) {
      return error;
    }
  };
}

const dbClient = new DBClient();

export { dbClient };
