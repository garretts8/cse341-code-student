const routes = require('express').Router();
const audiobooksRoutes = require('./audiobooks');
const usersRoutes = require('./users');

// routes.use('/audiobooks', require('./audiobooks'));
routes.use('/audiobooks', audiobooksRoutes);
routes.use('/users', usersRoutes);

routes.use('/', require('./swagger'));

routes.get('/', (req, res) => {
  res.json({ message: 'Audiobook Library API' });
});

module.exports = routes;
