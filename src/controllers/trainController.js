const Train = require('../models/Train');

// Retrieve all trains
const getAllTrains = async (req, res) => {
    try {
        const trains = await Train.find({});
        res.status(200).json(trains);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Retrieve specific train
const getTrainById = async (req, res) => {
    try {
        const train = await Train.findOne({ train_id: req.params.train_id });
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.status(200).json(train);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Retrieve live location details of a specific train
const getTrainLocations = async (req, res) => {
    try {
        const locations = await Train.find({ train_id: req.params.train_id }).sort({ timestamp: -1 });
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Ingest train location data
const addTrainLocation = async (req, res) => {
    try {
        const { train_id, timestamp, latitude, longitude, speed, direction } = req.body;
        
        const newLocation = new Train({
            train_id,
            timestamp,
            latitude,
            longitude,
            speed,
            direction,
        });

        await newLocation.save();
        res.status(201).json({ message: 'Location data added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllTrains,
    getTrainById,
    getTrainLocations,
    addTrainLocation,
};