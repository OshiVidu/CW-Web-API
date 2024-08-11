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
        res.status(500).json({ message: error.message });
    }
};

// Controller function to handle POST request to ingest train location data
const addTrainLocation = async (req, res) => {
    try {
        const locationData = req.body;
        const newLocation = await trainService.addTrainLocation(locationData);
        res.status(201).json({ message: 'Location data added successfully', data: newLocation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTrains,
    getTrainById,
    getTrainLocations,
    addTrainLocation,
};