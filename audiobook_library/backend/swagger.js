const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Audiobook Library API',
    description: 'Audiobook Library CRUD API',
  },
  host: process.env.HOST || 'localhost:8080',
  schemes: ['https', 'http'],

  // Add JWT security
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your token as: Bearer <JWT>',
    },
  },
  security: [{ BearerAuth: [] }],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/audiobooks.js', './routes/users.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
