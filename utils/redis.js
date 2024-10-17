// utils/redis.js
import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Handle errors on connection
    this.client.on('error', (err) => console.error(`Redis client error: ${err}`));
  }

  /**
   * Checks if Redis connection is alive
   * @returns {boolean} true if connected, false otherwise
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Gets the value stored in Redis for the given key
   * @param {string} key - Redis key
   * @returns {Promise<string|null>} value associated with the key or null if key does not exist
   */
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          console.error(`Error getting key ${key}: ${err}`);
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  /**
   * Sets a value in Redis for a given key with expiration time
   * @param {string} key - Redis key
   * @param {string|number} value - value to store in Redis
   * @param {number} duration - expiration time in seconds
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err) => {
        if (err) {
          console.error(`Error setting key ${key}: ${err}`);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Deletes a key from Redis
   * @param {string} key - Redis key
   * @returns {Promise<void>}
   */
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          console.error(`Error deleting key ${key}: ${err}`);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
