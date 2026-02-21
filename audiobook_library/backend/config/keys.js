// Load environment variables
require('dotenv').config({ path: './.env' });

module.exports = {
  google: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
  },
  session: {
    SECRET: process.env.SESSION_SECRET || 'audiobook-library-secret-key',
  },
};
