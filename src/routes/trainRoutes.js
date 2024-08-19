const express = require('express');
const router = express.Router();
const {
    getAllTrains,
    getTrainById,
    getTrainLocations,
    addTrainLocations,
    getJourneyTime,
    // estimateTime,
    submitLuggageForm,
    verifyOtp,
} = require('../controllers/trainController');

router.get('/trains', getAllTrains);
router.get('/trains/:train_id', getTrainById);
router.get('/trains/:train_id/locations', getTrainLocations);

// POST endpoint for ingesting train location data
router.post('/data', addTrainLocations);

//GET journey time
router.get('/journey-time', getJourneyTime);

// Route to handle luggage form submission
router.post('/submit-luggage-form', submitLuggageForm);

// Route to verify OTP and confirm pickup
router.get('/verify-otp/:otp', verifyOtp);

module.exports = router;