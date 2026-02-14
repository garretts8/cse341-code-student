const routes = require('express').Router();
const userController = require('../controllers/users');

// GET all users
routes.get('/', userController.getAllUsers);

// GET a single user by ID
routes.get('/:id', userController.getUserById);

// POST to create a new user
routes.post('/', userController.createUser);

// PUT to update a user
routes.put('/:id', userController.updateUser);

// DELETE to delete a user
routes.delete('/:id', userController.deleteUser);

module.exports = routes;
