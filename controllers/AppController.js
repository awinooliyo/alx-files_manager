// controllers/AppController.js
import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

class AppController {
  /**
   * GET /status
   * Returns the status of Redis and MongoDB connections
   */
  static getStatus(req, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive()
    };
    return res.status(200).json(status);
  }

  /**
   * GET /stats
   * Returns the number of users and files in the database
   */
  static async getStats(req, res) {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();
      const stats = {
        users: usersCount,
        files: filesCount
      };
      return res.status(200).json(stats);
    } catch (err) {
      console.error('Error fetching stats:', err);
      return res.status(500).json({ error: 'Unable to fetch stats' });
    }
  }
}

export default AppController;
