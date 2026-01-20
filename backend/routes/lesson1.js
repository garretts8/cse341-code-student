const router = require('express').Router();
const lesson1 = require('../controllers/lesson1');

// routes that must be on port 3000
router.get('/lesson1', lesson1.lesson1Route);
router.get('/mitchelle', lesson1.mitchelleRoute);
router.get('/spencer', lesson1.spencerRoute);
router.get('/dade', lesson1.dadeRoute);
router.get('/test/:id', lesson1.testRoute);

module.exports = router;