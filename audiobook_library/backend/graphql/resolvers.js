const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const audiobookController = require('../controllers/audiobooks');
const userController = require('../controllers/users');

// Reuse your existing controller logic!
const resolvers = {
  // Queries
  audiobooks: async (args, context) => {
    // Check authentication
    if (!context.req.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    // Reuse your existing controller
    const result = await mongodb
      .getDb()
      .collection('audiobooks')
      .find()
      .toArray();
    return result;
  },

  audiobook: async ({ id }, context) => {
    if (!context.req.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    const result = await mongodb
      .getDb()
      .collection('audiobooks')
      .findOne({ _id: new ObjectId(id) });

    if (!result) {
      throw new Error('Audiobook not found');
    }

    return result;
  },

  users: async (args, context) => {
    if (!context.req.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    return await mongodb.getDb().collection('users').find().toArray();
  },

  user: async ({ id }, context) => {
    if (!context.req.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    const result = await mongodb
      .getDb()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });

    if (!result) {
      throw new Error('User not found');
    }

    return result;
  },

  me: async (args, context) => {
    return context.req.user || null;
  },

  // Mutations - You could even call your existing controllers here!
  createAudiobook: async ({ input }, context) => {
    if (!context.req.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    // Reuse validation from your controller
    const existingAudiobook = await mongodb
      .getDb()
      .collection('audiobooks')
      .findOne({ ASIN: input.ASIN });

    if (existingAudiobook) {
      throw new Error('Audiobook with this ASIN already exists');
    }

    const result = await mongodb
      .getDb()
      .collection('audiobooks')
      .insertOne(input);

    return { _id: result.insertedId, ...input };
  },

  // Similar for other mutations...
  updateAudiobook: async ({ id, input }, context) => {
    if (!context.req.isAuthenticated()) {
      throw new Error('Authentication required');
    }
    // ... implementation
  },

  deleteAudiobook: async ({ id }, context) => {
    if (!context.req.isAuthenticated()) {
      throw new Error('Authentication required');
    }
    // ... implementation
  },
};

module.exports = resolvers;
