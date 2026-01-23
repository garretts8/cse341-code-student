const routes = require('express').Router();
const contactController = require('../controllers/contacts');

// GET all contacts
routes.get('/', contactController.getAllContacts);
// GET a single contact
routes.get('/:id', contactController.getSingleContact);

// POST contact
routes.post('/', contactController.createContact);

module.exports = routes;
