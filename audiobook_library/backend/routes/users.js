const routes = require('express').Router();
const userController = require('../controllers/users');
const { userValidationRules } = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/auth');

// GET all users (Protected)
routes.get('/', isAuthenticated, userController.getAllUsers);

// GET a single user by ID (Protected)
routes.get(
  '/:id',
  isAuthenticated,
  userValidationRules.getById,
  userController.getUserById,
);

// POST to create a new user (Protected)
routes.post(
  '/',
  isAuthenticated,
  userValidationRules.create,
  userController.createUser,
);

// PUT to update a user (Protected)
routes.put(
  '/:id',
  isAuthenticated,
  userValidationRules.update,
  userController.updateUser,
);

// DELETE to delete a user (Protected)
routes.delete(
  '/:id',
  isAuthenticated,
  userValidationRules.delete,
  userController.deleteUser,
);

module.exports = routes;
