const routes = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/users');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Authentication required' });
};

// OAuth routes
routes.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

routes.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  userController.oauthCallback
);

// Logout
// routes.get('/logout', isAuthenticated, userController.logoutUser);

// GET current user profile
routes.get('/profile', isAuthenticated, userController.getCurrentUser);

// GET all users (admin only)
routes.get('/', isAuthenticated, userController.getAllUsers);

// PUT update user profile
routes.put('/:id', isAuthenticated, userController.updateUser);

module.exports = routes;