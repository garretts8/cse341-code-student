const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Audiobook Library API',
    description: 'Audiobook Library CRUD API with Google OAuth Authentication',
    version: '1.0.0',
  },
  host: process.env.HOST || 'localhost:8080',
  schemes: ['http', 'https'],

  // Add OAuth2 security definition
  securityDefinitions: {
    googleOAuth2: {
      type: 'oauth2',
      flow: 'implicit',
      authorizationUrl: '/auth/google',
      scopes: {
        profile: 'Access your profile information',
        email: 'Access your email address',
      },
    },
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'connect.sid',
      description: 'Session cookie for authentication',
    },
  },
  security: [{ cookieAuth: [] }],
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/audiobooks.js',
  './routes/users.js',
  './routes/auth.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
