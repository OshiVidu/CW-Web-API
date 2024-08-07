const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

router.get('/trains', trainController.getAllTrains);
router.get('/trains/:train_id', trainController.getTrainById);
router.get('/trains/:train_id/locations', trainController.getTrainLocations);

module.exports = router;