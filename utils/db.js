import { MongoClient } from 'mongodb';
import { env } from 'process';

class DBClient {
  constructor() {
    const { DB_HOST, DB_PORT, DB_DATABASE } = env;
    this.host = DB_HOST || 'localhost';
    this.port = DB_PORT || 27017;
    this.dbName = DB_DATABASE || 'files_manager';

    MongoClient(`mongodb://${this.host}:${this.port}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .connect()
      .then((client) => {
        this.client = client;
        this.db = this.client.db(this.dbName);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  isAlive() {
    if (this.db) return true;
    return false;
  }

  async nbUsers() {
    const collection = this.db.collection('users');
    return collection.countDocuments();
  }

  async nbFiles() {
    const collection = this.db.collection('files');
    return collection.countDocuments();
  }
}

const dbClient = new DBClient();

export default dbClient;
