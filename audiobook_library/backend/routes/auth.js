const router = require('express').Router();
const passport = require('passport');
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// @desc    Auth with Google
// @route   GET /auth/google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login-failed',
    session: true,
  }),
  (req, res) => {
    // Successful authentication, redirect to home page with success message
    console.log('Authentication successful, redirecting to home');

    // Set a cookie to indicate logged in status for frontend
    res.cookie('isLoggedIn', 'true', {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: false, // Allow JavaScript to read it
    });

    res.cookie('userName', req.user.displayName, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
    });

    res.cookie('userId', req.user._id.toString(), {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
    });

    res.redirect('/');
  },
);

// @desc    Get current logged in user
// @route   GET /auth/me
router.get('/me', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.status(200).json({
      isAuthenticated: true,
      user: {
        _id: req.user._id,
        displayName: req.user.displayName,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        profilePhoto: req.user.profilePhoto,
      },
    });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Error logging out' });
    }

    // Clear cookies
    res.clearCookie('isLoggedIn');
    res.clearCookie('userName');
    res.clearCookie('userId');

    res.redirect('/');
  });
});

// @desc    Login failed page
// @route   GET /login-failed
router.get('/login-failed', (req, res) => {
  res.status(401).send(`
    <html>
      <head><title>Login Failed</title></head>
      <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h1>Login Failed</h1>
        <p>Unable to authenticate with Google. Please try again.</p>
        <a href="/" style="display: inline-block; padding: 10px 20px; background: #4a90e2; color: white; text-decoration: none; border-radius: 5px;">Return to Home</a>
      </body>
    </html>
  `);
});

// @desc    Get all users (protected - admin only in production)
// @route   GET /auth/users
router.get('/users', async (req, res) => {
  try {
    // Check if user is authenticated (optional - you can remove this for development)
    // if (!req.isAuthenticated || !req.isAuthenticated()) {
    //   return res.status(401).json({ message: 'Not authenticated' });
    // }

    const db = mongodb.getDb();
    const users = await db.collection('users').find().toArray();

    // Remove sensitive information if needed
    const sanitizedUsers = users.map((user) => ({
      _id: user._id,
      googleId: user.googleId,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      date: user.date,
      profilePhoto: user.profilePhoto,
      lastLogin: user.lastLogin,
    }));

    res.status(200).json(sanitizedUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get user by ID
// @route   GET /auth/users/:id
router.get('/users/:id', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const user = await db.collection('users').findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
