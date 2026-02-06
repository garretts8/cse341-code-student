const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Audiobook Library API',
    description: 'API for managing an audiobook library with user authentication',
    version: '1.0.0',
    contact: {
      name: 'Your Name',
      email: 'your.email@example.com'
    }
  },
  host: process.env.NODE_ENV === 'production' 
    ? 'your-render-app.onrender.com' 
    : 'localhost:3000',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
  securityDefinitions: {
    GoogleOAuth: {
      type: 'oauth2',
      flow: 'implicit',
      authorizationUrl: '/users/auth/google',
      scopes: {
        'profile': 'Access your profile information',
        'email': 'Access your email address'
      }
    }
  },
  tags: [
    {
      name: 'Audiobooks',
      description: 'Operations related to audiobooks'
    },
    {
      name: 'Users',
      description: 'User management and authentication'
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/index.js',
  './routes/audiobooks.js',
  './routes/users.js'
];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully');
});