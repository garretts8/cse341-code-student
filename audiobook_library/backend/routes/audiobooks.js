const routes = require('express').Router();
const audiobookController = require('../controllers/audiobooks');

// GET all audiobooks
routes.get('/', audiobookController.getAllAudiobooks);

// GET a single audiobook by ID
routes.get('/:id', audiobookController.getAudiobookById);

// POST to create a new audiobook
routes.post('/', audiobookController.createAudiobook);

// #swagger.tags = ['Audiobooks']
// #swagger.parameters['id'] = { description: 'Audiobook ID' }
// PUT to update a audiobook
routes.put('/:id', audiobookController.updateAudiobook);

// #swagger.tags = ['Audiobooks']
// #swagger.parameters['id'] = { description: 'Audiobook ID' }
// DELETE to delete a audiobook
routes.delete('/:id', audiobookController.deleteAudiobook);

module.exports = routes;
