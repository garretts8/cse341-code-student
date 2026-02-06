const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

//GET all audiobooks
const getAllAudiobooks = async (requestAnimationFrame, res) => {
    try{
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

//GET a single audiobook by ID
const getSingleAudiobook = async (req, res) => {
    try{
        const audiobookId = new ObjectId(req.param.id);

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

// POST create a new audiobook
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
      description: req.body.description
    };

    // Validation
    if (!audiobook.title || !audiobook.author) {
      return res.status(400).json({ 
        message: 'Title and author are required fields' 
      });
    }

    // Validate ASIN format if provided
    if (audiobook.ASIN && !/^[A-Z0-9]{10}$/.test(audiobook.ASIN)) {
      return res.status(400).json({ 
        message: 'ASIN must be 10 characters (letters and numbers only)' 
      });
    }

    const response = await mongodb
      .getDb()
      .collection('audiobooks')
      .insertOne(audiobook);

    res.status(201).json({ 
      message: 'Audiobook created successfully',
      id: response.insertedId,
      audiobook 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports =  {
    getAllAudiobooks,
    getSingleAudiobook,
    createAudiobook
};
