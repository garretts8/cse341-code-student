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

// Root page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

//Lesson routes
app.use(require('./routes/lesson1'));

//API Routes
app.use(require('./routes'));

// Static files
app.use(express.static(path.join(__dirname, '../frontend')));


/* =====================================
   Initialize MongoDB and start server
======================================== */
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`App running on http://localhost:${PORT}`);
    });
  }
});
