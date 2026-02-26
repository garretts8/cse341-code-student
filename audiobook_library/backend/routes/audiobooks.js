const routes = require('express').Router();
const audiobookController = require('../controllers/audiobooks');
const { audiobookValidationRules } = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/auth');

// GET all audiobooks
routes.get('/', isAuthenticated, audiobookController.getAllAudiobooks);

// GET a single audiobook by ID (with validation)
routes.get(
  '/:id',
  isAuthenticated,
  audiobookValidationRules.getById,
  audiobookController.getAudiobookById,
);

// POST to create a new audiobook (with validation)
routes.post(
  '/',
  isAuthenticated,
  audiobookValidationRules.create,
  audiobookController.createAudiobook,
);

// PUT to update an audiobook (with validation)
// PUT
routes.put(
  '/:id',
  isAuthenticated,
  audiobookValidationRules.update,
  audiobookController.updateAudiobook,
);

// DELETE to delete an audiobook (with validation)
routes.delete(
  '/:id',
  isAuthenticated,
  audiobookValidationRules.delete,
  audiobookController.deleteAudiobook,
);

module.exports = routes;
