const express = require('express');
const path = require('path');
const cors = require('cors');
const mongodb = require('./db/connect');

/* ===================================
   Test and Contacts on Server 3000 and 8080
===================================== */
const app8080 = express();
const app3000 = express();

const PORT_8080 = 8080;
const PORT_3000 = 3000;

app8080.use(cors());
app8080.use(express.json());

app3000.use(express.json());
app3000.use(express.urlencoded({ extended: true }));

// default route
app3000.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/lesson1.html'));
});

// serve frontend
app8080.use(express.static(path.join(__dirname, '../frontend')));

// serve same frontend folder (HTML views)
app3000.use(express.static(path.join(__dirname, '../frontend')));

// student routes
app8080.use(require('./routes'));

// Test routes ONLY
app3000.use(require('./routes/lesson1'));



/* =========================
   START BOTH SERVERS
========================= */
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app8080.listen(PORT_8080, () => {
      console.log(`Contacts app running on http://localhost:${PORT_8080}`);
    });

    app3000.listen(PORT_3000, () => {
      console.log(`test app running on http://localhost:${PORT_3000}`);
    });
  }
});
