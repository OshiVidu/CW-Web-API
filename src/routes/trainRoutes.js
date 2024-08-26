const express = require('express');
const router = express.Router();
const {
    getAllTrains,
    getTrainById,
    getTrainLocations,
    addTrainLocations,
    getJourneyTime,
} = require('../controllers/trainController');

const {
    addItem,
    getItemAndTrainDetails,
} = require('../controllers/itemController');

// GET all trains
router.get('/trains', getAllTrains);
// GET specific train
router.get('/trains/:train_id', getTrainById);
// GET live location details of specific train
router.get('/trains/:train_id/locations', getTrainLocations);

// POST endpoint for ingesting train location data
router.post('/data', addTrainLocations);

//GET journey time
router.get('/journey-time', getJourneyTime);



// Item routes
router.post('/items', addItem);
router.get('/items/:item_id', getItemAndTrainDetails);

module.exports = router;