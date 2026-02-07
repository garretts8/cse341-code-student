const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes (audiobooks, etc.)
app.use(require('./routes'));

mongodb
  .initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Audiobook API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
