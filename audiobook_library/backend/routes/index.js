const routes = require('express').Router();

routes.use('/audiobooks', require('./audiobooks'));
routes.use('/', require('./swagger'));

routes.get('/', (req, res) => {
  res.json({ message: 'Audiobook Library API' });
});

module.exports = routes;
