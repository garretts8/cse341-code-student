const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
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

  securityDefinitions: {
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

  security: [{ cookieAuth: [] }, { bearerAuth: [] }],

  definitions: {
    Audiobook: {
      type: 'object',
      properties: {
        _id: { type: 'string', example: '6984291c7ce7232969cc8678' },
        title: { type: 'string', example: 'The Historian' },
        author: { type: 'string', example: 'Elizabeth Kostova' },
        listening_length: { type: 'string', example: '26 hours and 6 minutes' },
        publisher: { type: 'string', example: 'Random House Audio' },
        narrator: { type: 'string', example: 'Justine Eyre, Paul Michael' },
        ASIN: { type: 'string', example: 'JB000E0LDRU' },
        audio_release_date: { type: 'string', example: 'November 30, 2010' },
        description: {
          type: 'string',
          example:
            'The record-breaking phenomenon from Elizabeth Kostova is a celebrated …',
        },
      },
      required: [
        'title',
        'author',
        'listening_length',
        'publisher',
        'narrator',
        'ASIN',
        'audio_release_date',
        'description',
      ],
    },
    User: {
      type: 'object',
      properties: {
        _id: { type: 'string', example: '69843aa57ce7232969cc8688' },
        googleId: { type: 'string', example: '123456789012345678901' },
        displayName: { type: 'string', example: 'John Smith' },
        firstName: { type: 'string', example: 'John' },
        lastName: { type: 'string', example: 'Smith' },
        email: { type: 'string', example: 'john.smith@gmail.com' },
        date: { type: 'string', example: '01/10/2024' },
      },
      required: [
        'googleId',
        'displayName',
        'firstName',
        'lastName',
        'email',
        'date',
      ],
    },
  },
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
  './routes/index.js', // This will capture all routes mounted in index
];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger documentation generated successfully');
  })
  .catch((err) => {
    console.error('Error generating swagger:', err);
  });
