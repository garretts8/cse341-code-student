const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// To GET all contacts
const getAllContacts = async (req, res) => {
  try {
    // now _db is already the 'test' database
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'err.message' });
  }
};

// To GET a single contact
const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!result) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Use POST to create a contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    // all fields required
    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.favoriteColor ||
      !contact.birthday
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .insertOne(contact);

    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
};
