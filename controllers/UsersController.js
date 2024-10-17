// controllers/UsersController.js
import sha1 from 'sha1';
// import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

class UsersController {
  /**
   * POST /users
   * Creates a new user in the database
   */
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Validate email and password
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the email already exists in the DB
    const userExists = await dbClient.db.collection('users').findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password using SHA1
    const hashedPassword = sha1(password);

    // Insert the new user into the DB
    const newUser = { email, password: hashedPassword };
    try {
      const result = await dbClient.db.collection('users').insertOne(newUser);
      return res.status(201).json({
        id: result.insertedId,
        email,
      });
    } catch (error) {
      console.error('Error inserting new user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
