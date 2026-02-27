// Load environment variables
require('dotenv').config({ path: './.env' });

//Determine if app is running in production(based on RENDER or Node_ENV)
const isProduction =
  process.env.RENDER === 'true' || process.env.NODE_ENV === 'production';

/*Exports organized config object with google OAuth credentials, callback URLs,
Session and JWT secrets and productions status*/
module.exports = {
  google: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    // Use CALLBACK_URL for development, RENDER_CALLBACK_URL for production
    CALLBACK_URL: isProduction
      ? process.env.RENDER_CALLBACK_URL
      : process.env.LOCAL_CALLBACK_URL ||
        'http://localhost:8080/auth/google/callback',
  },
  session: {
    SECRET: process.env.SESSION_SECRET || 'audiobook-library-secret-key',
  },
  jwt: {
    SECRET:
      process.env.JWT_SECRET || process.env.SESSION_SECRET || 'jwt-secret-key',
  },
  isProduction,
};
