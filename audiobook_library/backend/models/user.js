const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    displayName: String,
    firstName: String,
    lastName: String,
    email: String,
    date: Date,
  },
  { collection: 'users' },
);

module.exports = mongoose.model('User', userSchema);
