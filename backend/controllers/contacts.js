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

module.exports = {
  getAllContacts,
  getSingleContact,
};
