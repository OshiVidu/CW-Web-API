const Train = require('../models/Train');

// Service function to retrieve all trains
const getAllTrains = async () => {
    try {
        const trains = await Train.find({});
        return trains;
    } catch (error) {
        throw new Error('Error fetching all trains: ' + error.message);
    }
};

// Service function to retrieve a specific train by ID
const getTrainById = async (train_id) => {
    try {
        const train = await Train.findOne({ train_id: train_id });
        if (!train) {
            throw new Error('Train not found');
        }
        return train;
    } catch (error) {
        throw new Error('Error fetching train: ' + error.message);
    }
};

// Service function to retrieve location data for a specific train
const getTrainLocations = async (train_id) => {
    try {
        const locations = await Train.find({ train_id: train_id }).sort({ timestamp: -1 });
        return locations;
    } catch (error) {
        throw new Error('Error fetching train locations: ' + error.message);
    }
};

// Service function to save new location data
const addTrainLocation = async (locationData) => {
    try {
        const newLocation = new Train(locationData);
        await newLocation.save();
        return newLocation;
    } catch (error) {
        throw new Error('Error adding train location: ' + error.message);
    }
};

module.exports = {
    getAllTrains,
    getTrainById,
    getTrainLocations,
    addTrainLocation,
};