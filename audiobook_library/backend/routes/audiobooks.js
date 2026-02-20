const routes = require('express').Router();
const audiobookController = require('../controllers/audiobooks');
const { audiobookValidationRules } = require('../middleware/validation');

// GET all audiobooks
routes.get('/', audiobookController.getAllAudiobooks);

// GET a single audiobook by ID (with validation)
routes.get(
  '/:id',
  audiobookValidationRules.getById,
  audiobookController.getAudiobookById,
);

// POST to create a new audiobook (with validation)
routes.post(
  '/',
  audiobookValidationRules.create,
  audiobookController.createAudiobook,
);

// PUT to update an audiobook (with validation)
routes.put(
  '/:id',
  audiobookValidationRules.update,
  audiobookController.updateAudiobook,
);

// DELETE to delete an audiobook (with validation)
routes.delete(
  '/:id',
  audiobookValidationRules.delete,
  audiobookController.deleteAudiobook,
);

module.exports = routes;
