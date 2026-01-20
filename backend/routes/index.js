const routes = require('express').Router();
const userController = require('../controllers/user');
const contactsRoutes = require('./contacts');

routes.get('/professional', userController.getProfessional);
routes.use('/contacts', contactsRoutes);

module.exports = routes;