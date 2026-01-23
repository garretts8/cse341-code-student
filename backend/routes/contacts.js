const routes = require('express').Router();
const contactController = require('../controllers/contacts');

// GET all contacts
routes.get('/', contactController.getAllContacts);
// GET a single contact
routes.get('/:id', contactController.getSingleContact);

// POST to add a contact
routes.post('/', contactController.createContact);

// PUT to update a contact
routes.put('/:id', contactController.updateContact);

// DELETE to delete a contact
routes.delete('/:id', contactController.deleteContact);

module.exports = routes;
