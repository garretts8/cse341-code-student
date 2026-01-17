const express = require('express');
const path = require('path');
const cors = require('cors'); 
const app = express();
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;

// Enable CORS
app.use(cors());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use(require('./routes'));

// Optional: redirect / to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`MongoDB connected, server running on http://localhost:${port}`);
    });
  }
});