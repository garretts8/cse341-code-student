const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 API',
    description: 'Contacts, Temple, and Professional API',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};
const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/index.js',
  './routes/contacts.js',
  './routes/temple.js',
  './routes/lesson1.js',
];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
