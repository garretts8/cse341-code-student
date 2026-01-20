const routes = require('express').Router();
const userController = require('../controllers/user');
const contactsRoutes = require('./contacts');
const lesson1Controller = require('../controllers/lesson1');

routes.get('/professional', userController.getProfessional);
routes.use('/contacts', contactsRoutes);

//week1 routes
// routes.get('/lesson1', lesson1Controller.less1Route);
routes.get('/mitchelle', lesson1Controller.mitchelleRoute);
routes.get('/spencer', lesson1Controller.spencerRoute);
routes.get('/dade', lesson1Controller.dadeRoute);
routes.get('/test/:id', lesson1Controller.testRoute);

module.exports = routes;