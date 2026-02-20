const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// GET all audiobooks
const getAllAudiobooks = async (req, res) => {
  /*ERROR HANDLING - (runtime / database errors)
  Making sure database connection issues are handled, and 
   and that MongoDB query failures are handled.*/
  try {
    const result = await mongodb
      .getDb()
      .collection('audiobooks')
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    // ERROR HANDLING (server-side / unexpected errors)
    res.status(500).json({ message: err.message });
  }
};

// GET audiobook by ID
const getAudiobookById = async (req, res) => {
  /* VALIDATION (input format):
   - Ensures req.params.id can be converted into a valid MongoDB ObjectId  */
  try {
    const audiobookId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('audiobooks')
      .findOne({ _id: audiobookId });

    // ERROR HANDLING (resource not found)
    if (!result) {
      res.status(404).json({ message: 'Audiobook not found' });
    } else {
      res.status(200).json(result);
    }
    // ERROR HANDLING (Invalid ObjectId format, Database errors)
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

    /*  // VALIDATION - Check if ASIN already exists
    Ensure an audiobook with the same ASIN cannot be created twice */
    const existingAudiobook = await mongodb
      .getDb()
      .collection('audiobooks')
      .findOne({ ASIN: audiobook.ASIN });

    if (existingAudiobook) {
      return res.status(409).json({
        message:
          'Audiobook with this ASIN already exists. ASIN must be unique.',
      });
    }

    // VALIDATION (Ensures all required audiobook fields are present)
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

    res.status(201).json({
      message: 'Audiobook created successfully',
      id: response.insertedId,
    });
    // ERROR HANDLING (Database insert failure, Server/runtime errors)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update an audiobook
const updateAudiobook = async (req, res) => {
  // VALIDATION (input format: Validates MongoDB ObjectId format)
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

    /*  // VALIDATION - Check if ASIN already exists (excluding current audiobook)
    Ensure an audiobook cannot be updated to an ASIN that's already in use */
    if (req.body.ASIN) {
      const existingAudiobook = await mongodb
        .getDb()
        .collection('audiobooks')
        .findOne({
          ASIN: audiobook.ASIN,
          _id: { $ne: audiobookId }, // Exclude current audiobook
        });

      if (existingAudiobook) {
        return res.status(409).json({
          message:
            'ASIN is already in use by another audiobook. ASIN must be unique.',
        });
      }
    }

    const response = await mongodb
      .getDb()
      .collection('audiobooks')
      .replaceOne({ _id: audiobookId }, audiobook);

    // ERROR HANDLING (Resource not found. ID was valid, but no document matched it)
    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Audiobook not found' });
    }

    if (response.modifiedCount === 0) {
      return res
        .status(200)
        .json({ message: 'Audiobook data is already up to date' });
    }

    res.status(200).json({ message: 'Audiobook updated successfully' });
    // ERROR HANDLING (Invalid ObjectId, Database failures)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Use DELETE to delete an audiobook
const deleteAudiobook = async (req, res) => {
  // VALIDATION (input format: Validates MongoDB ObjectId format)
  try {
    const audiobookId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .collection('audiobooks')
      .deleteOne({ _id: audiobookId });

    // ERROR HANDLING (resource not found):
    if (response.deletedCount === 0) {
      res.status(404).json({ message: 'Audiobook not found' });
    } else {
      res.status(200).json({ message: 'Audiobook deleted successfully' });
    }
    // ERROR HANDLING (Invalid ObjectId, Database failures)
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
