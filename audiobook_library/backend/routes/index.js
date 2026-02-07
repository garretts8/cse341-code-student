const routes = require('express').Router();
const audiobooksRoutes = require('./audiobooks');

routes.use('/audiobooks', require('./audiobooks'));
routes.use('/audiobooks', audiobooksRoutes);
routes.use('/', require('./swagger'));

routes.get('/', (req, res) => {
  res.json({ message: 'Audiobook Library API' });
});

module.exports = routes;
