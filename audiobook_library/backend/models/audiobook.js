const mongoose = require('mongoose');

const audiobookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    listening_length: String,
    publisher: String,
    narrator: String,
    ASIN: String,
    audio_release_date: String,
    description: String,
  },
  { collection: 'audiobooks' },
);

module.exports = mongoose.model('Audiobook', audiobookSchema);
