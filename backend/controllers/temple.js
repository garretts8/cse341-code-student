const mongodb = require('../db/connect');

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

// Helper function to get temples database
const getTemplesDb = () => {
  const db = mongodb.getDb();
  const client = db.client || db.s.client;
  return client.db('temples');
};

// Helper function to validate API key
const validateApiKey = (req) => {
  return req.header('apiKey') === apiKey;
};

// GET all temples
exports.findAll = async (req, res) => {
  try {
    // Check API key
    if (!validateApiKey(req)) {
      return res
        .status(401)
        .json({ message: 'Invalid apiKey, please read the documentation.' });
    }

    const templesDb = getTemplesDb();
    const result = await templesDb.collection('temples').find({}).toArray();

    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching temples:', err);
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving temples.',
    });
  }
};

// Find a single Temple with an id
exports.findOne = async (req, res) => {
  try {
    // Check API key
    if (!validateApiKey(req)) {
      return res
        .status(401)
        .json({ message: 'Invalid apiKey, please read the documentation.' });
    }

    const temple_id = parseInt(req.params.temple_id);
    const templesDb = getTemplesDb();
    const result = await templesDb.collection('temples').findOne({ temple_id });

    if (!result) {
      res
        .status(404)
        .json({ message: `Not found Temple with id ${temple_id}` });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    console.error('Error fetching temple:', err);
    res.status(500).json({ message: err.message });
  }
};

// POST to create a temple
exports.create = async (req, res) => {
  try {
    // Check API key
    if (!validateApiKey(req)) {
      return res
        .status(401)
        .json({ message: 'Invalid apiKey, please read the documentation.' });
    }

    // Validate request
    if (!req.body.name) {
      return res.status(400).send({ message: 'Content can not be empty!' });
    }

    // Create a temple object
    const temple = {
      temple_id: req.body.temple_id,
      name: req.body.name,
      location: req.body.location || 'Location Not Available',
      dedicated: req.body.dedicated || 'Announced',
      additionalInfo: req.body.additionalInfo || false,
    };

    const templesDb = getTemplesDb();
    const response = await templesDb.collection('temples').insertOne(temple);

    res.status(201).json({
      message: 'Temple created successfully',
      id: response.insertedId,
      temple,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while creating the Temple.',
    });
  }
};
