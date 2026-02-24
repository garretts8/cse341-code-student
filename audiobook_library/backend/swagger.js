const swaggerAutogen = require('swagger-autogen')();
const path = require('path');
const keys = require('./config/keys');

const isProduction = keys.isProduction;

const doc = {
  info: {
    title: 'Audiobook Library API',
    description:
      'Complete Audiobook Library CRUD API with Google OAuth Authentication',
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'support@audiobooklibrary.com',
    },
  },
  host: isProduction ? 'cse341-code-student-1.onrender.com' : 'localhost:8080',
  basePath: '/',
  schemes: isProduction ? ['https'] : ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],

  // Security definitions
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
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'JWT token (format: Bearer <token>)',
    },
  },
  // security: [{ cookieAuth: [] }, { bearerAuth: [] }],

  // Tags for grouping endpoints
  tags: [
    {
      name: 'Audiobooks',
      description: 'Audiobook management endpoints',
    },
    {
      name: 'Users',
      description: 'User management endpoints',
    },
    {
      name: 'Authentication',
      description: 'Google OAuth authentication endpoints',
    },
  ],
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/audiobooks.js',
  './routes/users.js',
  './routes/auth.js',
  './routes/index.js',
];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger documentation generated successfully');
  })
  .catch((err) => {
    console.error('Error generating swagger:', err);
  });
