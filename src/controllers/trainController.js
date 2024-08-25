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

        // Get location names for each coordinate and include only necessary fields
        const locationPromises = locations.map(async (loc) => {
            const locationName = await trainService.getLocationName(loc.latitude, loc.longitude);
            return {
                latitude: loc.latitude,
                longitude: loc.longitude,
                locationName
            };
        });

        const locationsWithNames = await Promise.all(locationPromises);
        res.status(200).json(locationsWithNames);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

// Controller function to get journey time
const getJourneyTime = async (req, res) => {
    try {
        const { departureLocation, arrivalLocation } = req.query;
        if (!departureLocation || !arrivalLocation) {
            return res.status(400).json({ message: 'Departure and arrival locations are required' });
        }

        const estimatedTime = await trainService.getJourneyTime(departureLocation, arrivalLocation);
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
    getJourneyTime
};