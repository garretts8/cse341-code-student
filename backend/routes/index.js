const routes = require('express').Router();
const userController = require('../controllers/user');
const contactsRoutes = require('./contacts');
const temple = require('./temple');

routes.get('/professional', userController.getProfessional);
routes.use('/contacts', contactsRoutes);

routes.use('/', require('./swagger'));

routes.use('/temples', temple);
routes.use(
  '/',
  (docData = (req, res) => {
    const docData = {
      documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
    };
    res.send(docData);
  }),
);

module.exports = routes;
