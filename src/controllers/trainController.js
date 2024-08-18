const trainService = require('../services/trainService');

// Controller function to handle GET request to retrieve all trains
const getAllTrains = async (req, res) => {
    try {
        const trains = await trainService.getAllTrains();
        res.status(200).json(trains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to handle GET request for a specific train
const getTrainById = async (req, res) => {
    try {
        const train = await trainService.getTrainById(req.params.train_id);
        res.status(200).json(train);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to handle GET request for live location details of a specific train
const getTrainLocations = async (req, res) => {
    try {
        const locations = await trainService.getTrainLocations(req.params.train_id);
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to handle POST request to ingest multiple train location data
const addTrainLocations = async (req, res) => {
    try {
        const locationsData = req.body; // Expecting an array of location objects
        const newLocations = await trainService.addTrainLocations(locationsData);
        res.status(201).json({ message: 'Location data added successfully', data: newLocations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to estimate time to reach user's location
const estimateTime = async (req, res) => {
    try {
        const userLocation = req.query.userLocation;
        const trainId = req.params.train_id;

        const userCoordinates = await trainService.getUserCoordinates(userLocation);
        const estimatedTime = await trainService.calculateEstimatedTime(trainId, userCoordinates);

        res.status(200).json({ estimatedTime });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTrains,
    getTrainById,
    getTrainLocations,
    addTrainLocations,
    estimateTime,
};