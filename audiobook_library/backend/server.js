const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const mongodb = require('./db/connect');
const morgan = require('morgan');
const keys = require('./config/keys');

// Load config
dotenv.config({ paths: './.env' });

const app = express();
const PORT = process.env.PORT || 8080;

app.set('trust proxy', 1);

// Session configuration
app.use(cookieParser());
app.use(
  session({
    secret: keys.session.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // 24 hours
      maxAge: 24 * 60 * 60 * 1000,
      // HTTPS in production
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
    },
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [
            'https://cse341-code-student-1.onrender.com',
            'http://localhost:8080',
          ]
        : 'http://localhost:8080',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/views')));
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));

// API routes
app.use('/audiobooks', require('./routes/audiobooks'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

// Swagger/API docs - KEEP THIS
app.use('/api-docs', require('./routes/swagger'));

// Main index route handler - must come AFTER API routes
app.use('/', require('./routes/index'));

// Start server
mongodb
  .initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`,
      );
      console.log(`Frontend available at: http://localhost:${PORT}`);
      console.log(`API endpoints:`);
      console.log(`  - http://localhost:${PORT}/audiobooks`);
      console.log(`  - http://localhost:${PORT}/users`);
      console.log(`  - http://localhost:${PORT}/auth`);
      console.log(`  - http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
