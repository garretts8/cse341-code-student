const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// GET all audiobooks
const getAllAudiobooks = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection('audiobooks')
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET audiobook by ID
const getAudiobookById = async (req, res) => {
  try {
    const audiobookId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('audiobooks')
      .findOne({ _id: audiobookId });

    if (!result) {
      res.status(404).json({ message: 'Audiobook not found' });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create audiobook
const createAudiobook = async (req, res) => {
  try {
    const audiobook = {
      title: req.body.title,
      author: req.body.author,
      listening_length: req.body.listening_length,
      publisher: req.body.publisher,
      narrator: req.body.narrator,
      ASIN: req.body.ASIN,
      audio_release_date: req.body.audio_release_date,
      description: req.body.description,
    };

    // validation
    if (
      !audiobook.title ||
      !audiobook.author ||
      !audiobook.listening_length ||
      !audiobook.publisher ||
      !audiobook.narrator ||
      !audiobook.ASIN ||
      !audiobook.audio_release_date ||
      !audiobook.description
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const response = await mongodb
      .getDb()
      .collection('audiobooks')
      .insertOne(audiobook);

    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update an audiobook
const updateAudiobook = async (req, res) => {
  try {
    const audiobookId = new ObjectId(req.params.id);
    const audiobook = {
      title: req.body.title,
      author: req.body.author,
      listening_length: req.body.listening_length,
      publisher: req.body.publisher,
      narrator: req.body.narrator,
      ASIN: req.body.ASIN,
      audio_release_date: req.body.audio_release_date,
      description: req.body.description,
    };

    const response = await mongodb
      .getDb()
      .collection('audiobooks')
      .replaceOne({ _id: audiobookId }, audiobook);

    if (response.modifiedCount === 0) {
      res.status(404).json({ message: 'Audiobook not found' });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Use DELETE to delete an audiobook
const deleteAudiobook = async (req, res) => {
  try {
    const audiobookId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .collection('audiobooks')
      .deleteOne({ _id: audiobookId });

    if (response.deletedCount === 0) {
      res.status(404).json({ message: 'Audiobook not found' });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllAudiobooks,
  getAudiobookById,
  createAudiobook,
  updateAudiobook,
  deleteAudiobook,
};
