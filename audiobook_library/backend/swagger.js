const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Audiobook Library API',
    description: 'Audiobook Library CRUD API',
  },
  host: process.env.HOST || 'localhost:8080',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/audiobooks.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
