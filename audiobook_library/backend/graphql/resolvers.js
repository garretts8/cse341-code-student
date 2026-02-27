const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const audiobookController = require('../controllers/audiobooks');
const userController = require('../controllers/users');

// Reuses existing MongoDB logic from controllers.
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

    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    const result = await mongodb
      .getDb()
      .collection('audiobooks')
      .replaceOne({ _id: new ObjectId(id) }, input);

    if (result.matchedCount === 0) {
      throw new Error('Audiobook not found');
    }

    return { _id: id, ...input };
  },

  deleteAudiobook: async ({ id }, context) => {
    if (!context.req.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    try {
      const result = await mongodb
        .getDb()
        .collection('audiobooks')
        .deleteOne({ _id: new ObjectId(id) });

      // Return true if a document was deleted, false otherwise
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting audiobook:', error);
      throw new Error('Failed to delete audiobook');
    }
  },

  // User mutations (you'll need to add these too)
  createUser: async ({ input }, context) => {
    if (!context.req.isAuthenticated()) {
      throw new Error('Authentication required');
    }
    // Add implementation for createUser
    const result = await mongodb.getDb().collection('users').insertOne(input);
    return { _id: result.insertedId, ...input };
  },

  updateUser: async ({ id, input }, context) => {
    if (!context.req.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    const result = await mongodb
      .getDb()
      .collection('users')
      .replaceOne({ _id: new ObjectId(id) }, input);

    if (result.matchedCount === 0) {
      throw new Error('User not found');
    }

    return { _id: id, ...input };
  },

  deleteUser: async ({ id }, context) => {
    if (!context.req.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    try {
      const result = await mongodb
        .getDb()
        .collection('users')
        .deleteOne({ _id: new ObjectId(id) });

      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  },
};

module.exports = resolvers;
