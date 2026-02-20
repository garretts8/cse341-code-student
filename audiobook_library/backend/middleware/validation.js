const { body, param, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Format errors for better readability
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value,
    }));

    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: formattedErrors,
    });
  }
  next();
};

// User validation rules
const userValidationRules = {
  create: [
    body('googleId')
      .trim()
      .notEmpty()
      .withMessage('Google ID is required')
      .isLength({ min: 5, max: 100 })
      .withMessage('Google ID must be between 5 and 100 characters'),

    body('displayName')
      .trim()
      .notEmpty()
      .withMessage('Display name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Display name must be between 2 and 100 characters'),

    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('First name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\s.'-]+$/)
      .withMessage(
        'First name must contain only letters, spaces, periods, apostrophes, and hyphens',
      ),

    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Last name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\s.'-]+$/)
      .withMessage(
        'Last name must contain only letters, spaces, periods, apostrophes, and hyphens',
      ),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Must be a valid email address')
      .normalizeEmail(),

    body('date')
      .trim()
      .notEmpty()
      .withMessage('Date is required')
      .custom((value) => {
        // Check if matches MM/DD/YYYY format
        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        if (!dateRegex.test(value)) {
          throw new Error('Must be a valid date (MM/DD/YYYY format)');
        }

        // Validate it's a real date (e.g., not 02/30/2024)
        const [month, day, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        if (
          date.getFullYear() !== year ||
          date.getMonth() !== month - 1 ||
          date.getDate() !== day
        ) {
          throw new Error('Must be a valid date');
        }

        return true;
      }),

    handleValidationErrors,
  ],

  update: [
    param('id').isMongoId().withMessage('Invalid user ID format'),

    body('googleId')
      .optional()
      .trim()
      .isLength({ min: 5, max: 100 })
      .withMessage('Google ID must be between 5 and 100 characters'),

    body('displayName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Display name must be between 2 and 100 characters'),

    body('firstName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('First name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\s.'-]+$/)
      .withMessage(
        'First name must contain only letters, spaces, periods, apostrophes, and hyphens',
      ),

    body('lastName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Last name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\s.'-]+$/)
      .withMessage(
        'Last name must contain only letters, spaces, periods, apostrophes, and hyphens',
      ),

    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('Must be a valid email address')
      .normalizeEmail(),

    body('date')
      .optional()
      .trim()
      .custom((value) => {
        // Check if matches MM/DD/YYYY format
        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        if (!dateRegex.test(value)) {
          throw new Error('Must be a valid date (MM/DD/YYYY format)');
        }

        // Validate it's a real date (e.g., not 02/30/2024)
        const [month, day, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        if (
          date.getFullYear() !== year ||
          date.getMonth() !== month - 1 ||
          date.getDate() !== day
        ) {
          throw new Error('Must be a valid date');
        }

        return true;
      }),

    handleValidationErrors,
  ],

  getById: [
    param('id').isMongoId().withMessage('Invalid user ID format'),

    handleValidationErrors,
  ],

  delete: [
    param('id').isMongoId().withMessage('Invalid user ID format'),

    handleValidationErrors,
  ],
};

// Audiobook validation rules
const audiobookValidationRules = {
  create: [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ min: 1, max: 200 })
      .withMessage('Title must be between 1 and 200 characters'),

    body('author')
      .trim()
      .notEmpty()
      .withMessage('Author is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Author name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s.'-]+$/)
      .withMessage(
        'Author name can only contain letters, spaces, periods, apostrophes, and hyphens',
      ),

    body('listening_length')
      .trim()
      .notEmpty()
      .withMessage('Listening length is required')
      .matches(
        /^\d+\s+(hours?|minutes?|hrs?)\s+(and\s+)?\d*\s*(minutes?|mins?)?/i,
      )
      .withMessage(
        'Must be a valid listening length format (e.g., "25 hours and 49 minutes")',
      ),

    body('publisher')
      .trim()
      .notEmpty()
      .withMessage('Publisher is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Publisher name must be between 2 and 100 characters'),

    body('narrator')
      .trim()
      .notEmpty()
      .withMessage('Narrator is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Narrator name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s.,' -]+$/)
      .withMessage(
        'Narrator name can only contain letters, spaces, periods, apostrophes, and hyphens',
      ),

    body('ASIN')
      .trim()
      .notEmpty()
      .withMessage('ASIN is required')
      .isLength({ min: 10, max: 10 })
      .withMessage('ASIN must be exactly 10 characters')
      .matches(/^[A-Z0-9]{10}$/)
      .withMessage('ASIN must contain only uppercase letters and numbers'),

    body('audio_release_date')
      .trim()
      .notEmpty()
      .withMessage('Audio release date is required')
      .custom((value) => {
        // Validate format like "August 04, 2020"
        const dateRegex =
          /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}$/i;
        if (!dateRegex.test(value)) {
          throw new Error(
            'Must be a valid date format (Month DD, YYYY). Example September 5, 2015.',
          );
        }

        // Check if it's a real date
        const date = new Date(value);
        if (date.toString() === 'Invalid Date') {
          throw new Error('Must be a valid date');
        }

        return true;
      }),

    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required')
      .isLength({ min: 10, max: 5000 })
      .withMessage('Description must be between 10 and 5000 characters'),

    handleValidationErrors,
  ],

  update: [
    param('id').isMongoId().withMessage('Invalid audiobook ID format'),

    body('title')
      .optional()
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('Title must be between 1 and 200 characters'),

    body('author')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Author name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s.'-]+$/)
      .withMessage(
        'Author name can only contain letters, spaces, periods, apostrophes, and hyphens',
      ),

    body('listening_length')
      .optional()
      .trim()
      .matches(
        /^\d+\s+(hours?|minutes?|hrs?)\s+(and\s+)?\d*\s*(minutes?|mins?)?/i,
      )
      .withMessage(
        'Must be a valid listening length format (e.g., "25 hours and 49 minutes")',
      ),

    body('publisher')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Publisher name must be between 2 and 100 characters'),

    body('narrator')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Narrator name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s.,' -]+$/)
      .withMessage(
        'Narrator name can only contain letters, spaces, periods, apostrophes, and hyphens',
      ),

    body('ASIN')
      .optional()
      .trim()
      .isLength({ min: 10, max: 10 })
      .withMessage('ASIN must be exactly 10 characters')
      .matches(/^[A-Z0-9]{10}$/)
      .withMessage('ASIN must contain only uppercase letters and numbers'),

    body('audio_release_date')
      .optional()
      .trim()
      .custom((value) => {
        const dateRegex =
          /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}$/i;
        if (!dateRegex.test(value)) {
          throw new Error(
            'Must be a valid date format (Month DD, YYYY). Example September 5, 2015.',
          );
        }

        const date = new Date(value);
        if (date.toString() === 'Invalid Date') {
          throw new Error('Must be a valid date');
        }

        return true;
      }),

    body('description')
      .optional()
      .trim()
      .isLength({ min: 10, max: 5000 })
      .withMessage('Description must be between 10 and 5000 characters'),

    handleValidationErrors,
  ],

  getById: [
    param('id').isMongoId().withMessage('Invalid audiobook ID format'),

    handleValidationErrors,
  ],

  delete: [
    param('id').isMongoId().withMessage('Invalid audiobook ID format'),

    handleValidationErrors,
  ],
};

module.exports = {
  userValidationRules,
  audiobookValidationRules,
};
