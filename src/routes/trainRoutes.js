const express = require('express');
const router = express.Router();
const {
    getAllTrains,
    getTrainById,
    getTrainLocations,
    addTrainLocation,
} = require('../controllers/trainController');

router.get('/trains', getAllTrains);
router.get('/trains/:train_id', getTrainById);
router.get('/trains/:train_id/locations', getTrainLocations);

// POST endpoint for ingesting train location data
router.post('/data', addTrainLocation);

module.exports = router;