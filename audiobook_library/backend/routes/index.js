const routes = require('express').Router();
const audiobooksRoutes = require('./audiobooks');
const usersRoutes = require('./users');
const authRoutes = require('./auth');
const { optionalAuth } = require('../middleware/auth');

// API routes
routes.use('/audiobooks', optionalAuth, audiobooksRoutes);
routes.use('/users', optionalAuth, usersRoutes);
routes.use('/auth', authRoutes);

// Swagger documentation
routes.use('/api-docs', require('./swagger'));

// Home API info
routes.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Audiobook Library API',
    version: '1.0.0',
    authentication: {
      google: '/auth/google',
      status: req.isAuthenticated ? req.isAuthenticated() : false,
      user: req.user
        ? {
            name: req.user.displayName,
            email: req.user.email,
          }
        : null,
    },
    endpoints: {
      audiobooks: {
        getAll: 'GET /audiobooks',
        getById: 'GET /audiobooks/{id}',
        create: 'POST /audiobooks',
        update: 'PUT /audiobooks/{id}',
        delete: 'DELETE /audiobooks/{id}',
      },
      users: {
        getAll: 'GET /users',
        getById: 'GET /users/{id}',
        create: 'POST /users',
        update: 'PUT /users/{id}',
        delete: 'DELETE /users/{id}',
      },
      auth: {
        google: 'GET /auth/google',
        logout: 'GET /auth/logout',
        me: 'GET /auth/me',
        users: 'GET /auth/users',
      },
    },
    documentation: '/api-docs',
  });
});

module.exports = routes;
