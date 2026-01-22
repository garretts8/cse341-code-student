const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config(); // load .env

let dbInstance;

// Connects to the MongoDB
const initDb = async () => {
  if (dbInstance) {
    console.log('Db is already initialized!');
    return dbInstance;
  }

  // Use MONGO_URI from .env
  const uri = process.env.MONGO_URL;

  if (!uri) {
    throw new Error('MONGO_URI not defined in .env');
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB successfully!');
    // Get the database from the connection string
    dbInstance = client.db();
    // Test the connection
    await dbInstance.command({ ping: 1 });
    console.log('MongoDB connection test successful');
    return dbInstance;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
};

// Returns the database instance
const getDb = () => {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call initDb first.');
  }
  return dbInstance;
};

module.exports = {
  initDb,
  getDb,
};
