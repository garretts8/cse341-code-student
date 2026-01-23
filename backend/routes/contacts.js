const routes = require('express').Router();
const contactController = require('../controllers/contacts');

// GET all contacts
routes.get('/', contactController.getAllContacts);
// GET a single contact
routes.get('/:id', contactController.getSingleContact);

// POST to add contact
routes.post('/', contactController.createContact);

// PUT to update contact
routes.put('/:id', contactController.updateContact);

module.exports = routes;
