// utils/db.js
import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    // Get MongoDB connection details from environment variables or use defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}`;

    // Create MongoDB client
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    // Connect to the MongoDB client
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database); // Select the database
      })
      .catch((err) => {
        console.error(`MongoDB connection error: ${err}`);
      });
  }

  /**
   * Checks if MongoDB connection is alive
   * @returns {boolean} true if connected, false otherwise
   */
  isAlive() {
    return this.client && this.client.isConnected();
  }

  /**
   * Gets the number of documents in the 'users' collection
   * @returns {Promise<number>} Number of users
   */
  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (err) {
      console.error(`Error counting users: ${err}`);
      return 0;
    }
  }

  /**
   * Gets the number of documents in the 'files' collection
   * @returns {Promise<number>} Number of files
   */
  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (err) {
      console.error(`Error counting files: ${err}`);
      return 0;
    }
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
