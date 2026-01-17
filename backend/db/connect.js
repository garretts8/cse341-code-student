const dotenv = require('dotenv');
dotenv.config(); // load .env
const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  // Use MONGO_URI from .env
  const uri = process.env.MONGO_URL;

  if (!uri) {
    return callback(new Error('MONGO_URI not defined in .env'));
  }

  MongoClient.connect(uri)
    .then((client) => {
        //directly use 'test' database
      _db = client.db('test'); 
      console.log('MongoDB connected!');
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};