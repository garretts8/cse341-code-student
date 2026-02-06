const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const mongodb = require('./db/connect');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ==========================
   Middleware Configuration
========================== */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

/* ==========================
   Passport Configuration
========================== */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
      ? 'https://your-render-app.onrender.com/users/auth/google/callback'
      : `http://localhost:${PORT}/users/auth/google/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    // Store user profile in session
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/* ==========================
   Routes
========================== */
app.use('/', require('./routes'));

/* ==========================
   Error Handling Middleware
========================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

/* ==========================
   Initialize and Start Server
========================== */
const startServer = async () => {
  try {
    await mongodb.initDb();
    console.log('Connected to MongoDB database: audiobooks_library');
    
    app.listen(PORT, () => {
      console.log(`Audiobook Library API running on http://localhost:${PORT}`);
      console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();