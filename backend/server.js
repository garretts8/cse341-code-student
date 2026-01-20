const express = require('express');
const path = require('path');
const cors = require('cors');
const mongodb = require('./db/connect');

const app = express();

const PORT = process.env.PORT || 8080;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// routes
//Professional and contacts routes
app.use(require('./routes'));
// Test routes ONLY
app.use(require('./routes/lesson1'));

// Root route serves lesson1.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/lesson1.html'));
});

/* =====================================
   Initialize MongoDB and start server
======================================== */
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`App app running on http://localhost:${PORT}`);
    });
  }
});
