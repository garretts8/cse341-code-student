const routes = require('express').Router();
const userController = require('../controllers/users');
const { userValidationRules } = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/auth');

// GET all users
routes.get('/', userController.getAllUsers);

// GET a single user by ID (with validation)
routes.get('/:id', userValidationRules.getById, userController.getUserById);

// POST to create a new user (with validation)
routes.post(
  '/',
  isAuthenticated,
  userValidationRules.create,
  userController.createUser,
);

// PUT to update a user (with validation)
routes.put(
  '/:id',
  isAuthenticated,
  userValidationRules.update,
  userController.updateUser,
);

// DELETE to delete a user (with validation)
routes.delete(
  '/:id',
  isAuthenticated,
  userValidationRules.delete,
  userController.deleteUser,
);

module.exports = routes;
