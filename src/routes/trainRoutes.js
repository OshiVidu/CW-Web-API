const express = require('express');
const router = express.Router();
const {
    getAllTrains,
    getTrainById,
    getTrainLocations,
    addTrainLocations,
    estimateTime,
} = require('../controllers/trainController');

router.get('/trains', getAllTrains);
router.get('/trains/:train_id', getTrainById);
router.get('/trains/:train_id/locations', getTrainLocations);

// POST endpoint for ingesting train location data
router.post('/data', addTrainLocations);

// GET endpoint for estimating time to user's location
router.get('/trains/:train_id/estimate-time', estimateTime);

module.exports = router;