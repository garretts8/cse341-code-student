const express = require('express');
const path = require('path');
const cors = require('cors');
// imports mongodb from ./db/connect
const mongodb = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 8080;

/* ==========================
   Middleware
========================== */
// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../frontend')));

/* ==========================
   Frontend HTML routes
========================== */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/lesson1', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/lesson1.html'));
});

app.get('/test/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/test.html'));
});

/* ==========================
   Contacts routes 
========================== */
// To add a contact
app.post('/contacts', (req, res) => {
  res.status(200).json({ message: 'POST route hit!' });
});
// To update a contact
app.put('/contacts', (req, res) => {
  res.status(200).json({ message: 'PUT route hit!' });
});

// To delete a contact
app.delete('/contacts', (req, res) => {
  res.status(200).json({ message: 'DELETE route hit!' });
});

// Lesson 1 routes
app.use(require('./routes/lesson1'));

// API routes (contacts, professional, etc.)
app.use(require('./routes'));

/* ==========================
   API route for temples only
========================== */
app.use('/api/temple', require('./routes/temple'));

/* =====================================
   Initialize MongoDB and start server
======================================== */
// Calls mongodb.initDb() to establish connection
mongodb
  .initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
