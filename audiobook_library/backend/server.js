const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const mongodb = require('./db/connect');
const morgan = require('morgan');
const keys = require('./config/keys');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

// Load config
dotenv.config({ paths: './.env' });

const app = express();
const PORT = process.env.PORT || 8080;
const isProduction = keys.isProduction;

app.set('trust proxy', 1);

// Session configuration with MongoDB store for production
const sessionConfig = {
  secret: keys.session.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: isProduction, // HTTPS in production
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
  },
};

// Use MongoDB to store sessions in production
if (isProduction) {
  sessionConfig.store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60, // 24 hours
  });
}

app.use(cookieParser());
app.use(session(sessionConfig));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS configuration
const corsOptions = {
  origin: isProduction
    ? [
        'https://cse341-code-student-1.onrender.com',
        'https://cse341-code-student-1.onrender.com',
      ]
    : ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/views')));
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));

// Make user available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// API routes
app.use('/audiobooks', require('./routes/audiobooks'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

// Swagger/API docs
app.use('/api-docs', require('./routes/swagger'));

// Main index route handler
app.use('/', require('./routes/index'));

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
    context: { req, res },
    customFormatErrorFn: (err) => {
      console.error('GraphQL Error:', err);
      return {
        message: err.message,
        status: err.originalError?.status || 400,
        path: err.path,
      };
    },
  })),
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: 'Something went wrong!', error: err.message });
});

// Start server
mongodb
  .initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running in ${isProduction ? 'production' : 'development'} mode on port ${PORT}`,
      );
      console.log(`Frontend available at: http://localhost:${PORT}`);
      console.log(`API endpoints:`);
      console.log(`  - http://localhost:${PORT}/audiobooks`);
      console.log(`  - http://localhost:${PORT}/users`);
      console.log(`  - http://localhost:${PORT}/auth`);
      console.log(`  - http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
