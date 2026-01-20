const routes = require('express').Router();
const userController = require('../controllers/user');
const contactsRoutes = require('./contacts');

routes.get('/professional', userController.getProfessional);
routes.use('/contacts', contactsRoutes);

// routes.get('/lesson1', (req, res) => {
//   res.sendFile('lesson1.html', { root: './frontend' });
// });

// routes.get('/test/:id', lesson1Controller.testRoute);
// routes.post('/test/submit', lesson1Controller.testSubmit);


module.exports = routes;