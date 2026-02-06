const routes = require('express').Router();
const passport = require('passport');

// Import route modules
const audiobooksRoutes = require('./audiobooks');
const usersRoutes = require('./users');

// Health check endpoint
routes.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Audiobook Library API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      audiobooks: '/audiobooks',
      users: '/users',
      authentication: '/users/auth/google'
    }
  });
});

// Use route modules
routes.use('/audiobooks', audiobooksRoutes);
routes.use('/users', usersRoutes);

// Swagger documentation
routes.use('/', require('./swagger'));

module.exports = routes;