// routes/luggageRoutes.js
const express = require('express');
const router = express.Router();
const { bookLuggage, validateLuggageOTP } = require('../controllers/luggageController');

// POST route to book luggage
router.post('/luggage/book', bookLuggage);

// POST route to validate OTP
router.post('/luggage/validate', validateLuggageOTP);

module.exports = router;