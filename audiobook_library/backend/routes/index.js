const routes = require('express').Router();
const audiobooksRoutes = require('./audiobooks');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

// API routes
routes.use('/audiobooks', audiobooksRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);

// Swagger documentation
routes.use('/api-docs', require('./swagger'));

// Home API info
routes.get('/', (req, res) => {
  res.json({
    message: 'Audiobook Library API',
    authentication: 'Google OAuth is available at /auth/google',
    docs: '/api-docs',
  });
});

module.exports = routes;
