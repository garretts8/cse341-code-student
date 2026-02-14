const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// GET all users
const getAllUsers = async (req, res) => {
  /*ERROR HANDLING - (runtime / database errors)
  Handles MongoDB connection issues, query execution failures
  and unexpected server errors */
  try {
    const result = await mongodb.getDb().collection('users').find().toArray();
    // SUCCESS RESPONSE
    res.status(200).json(result);
    /* ERROR HANDLING (500 Internal Server Error)
    Catches any error thrown in the try block,  and
    prevents the server from crashing  */
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET user by ID
const getUserById = async (req, res) => {
  /* ERROR HANDLING (invalid ObjectId format)
  new ObjectId() will throw an error if the id is malformed */
  try {
    const userId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('users')
      .findOne({ _id: userId });

    /* ERROR HANDLING (404 Not Found)
    The request was valid, but no matching user exists  */
    if (!result) {
      res.status(404).json({ message: 'User not found' });
      // SUCCESS RESPONSE
    } else {
      res.status(200).json(result);
    }
    /* // ERROR HANDLING (500 Internal Server Error)
    Invalid ObjectId, Database failures, Unexpected server errors */
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a user
const createUser = async (req, res) => {
  try {
    const user = {
      googleId: req.body.googleId,
      displayName: req.body.displayName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      date: req.body.date,
    };

    /*  // VALIDATION
    Ensures all required fields are present, prevents incomplete 
    or invalid data from being saved, returns 400 Bad Request if 
    validation fails   */
    if (
      !user.googleId ||
      !user.displayName ||
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.date
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const response = await mongodb.getDb().collection('users').insertOne(user);

    // SUCCESS RESPONSE (201 Created)
    res.status(201).json({ id: response.insertedId });

    /* ERROR HANDLING (500 Internal Server Error)
    Database insertion failures, MongoDB connection errors,
    Unexpected runtime errors  */
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update a user
const updateUser = async (req, res) => {
  try {
    // ERROR HANDLING (invalid ObjectId format)
    const userId = new ObjectId(req.params.id);

    const user = {
      googleId: req.body.googleId,
      displayName: req.body.displayName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      date: req.body.date,
    };

    const response = await mongodb
      .getDb()
      .collection('users')
      .replaceOne({ _id: userId }, user);

    /* ERROR HANDLING (404 Not Found)
    No user exists with the provided ID */
    if (response.modifiedCount === 0) {
      res.status(404).json({ message: 'User not found' });
      // SUCCESS RESPONSE
    } else {
      res.status(204).send();
    }
    /* ERROR HANDLING (500 Internal Server Error)
  Invalid ObjectId, Database update failures, and
  Unexpected server errors  */
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Use DELETE to delete a user
const deleteUser = async (req, res) => {
  // ERROR HANDLING (invalid ObjectId format)
  try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('users')
      .deleteOne({ _id: userId });

    /* ERROR HANDLING (404 Not Found)
    No user exists with the provided ID  */
    if (response.deletedCount === 0) {
      res.status(404).json({ message: 'User not found' });
      // SUCCESS RESPONSE
    } else {
      res.status(204).send();
    }
    /* ERROR HANDLING (500 Internal Server Error)
  Invalid ObjectId, Database deletion failures, and
  Unexpected server errors  */
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
