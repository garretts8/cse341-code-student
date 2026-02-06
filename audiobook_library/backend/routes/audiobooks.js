const routes = require('express').Router();
const audiobookController = require('../controllers/audiobooks');

// GET all audiobooks
routes.get('/', audiobookController.getAllAudiobooks);

// GET a single audiobook by ID
routes.get('/:id', audiobookController.getSingleAudiobook);

// POST create a new audiobook (protected by OAuth)
routes.post('/', audiobookController.createAudiobook);

module.exports = routes;