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

const submitLuggageForm = async (req, res) => {
    try {
        const luggageData = req.body;

        // Save luggage details
        const { luggage, otp } = await trainService.saveLuggageDetails(luggageData);

        // Get available trains based on the provided date
        const availableTrains = await trainService.getAvailableTrainsByDate(luggageData.date);

        res.status(201).json({
            message: 'Luggage Transport Information Saved Successfully',
            otp,
            'All available trains based on the luggage booking date. Select the correct train according to your drop-off and pick-up locations. ': availableTrains
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to verify OTP and confirm pickup
const verifyOtp = async (req, res) => {
    try {
        const otp = req.query.otp;
        const luggage = await trainService.verifyOtpAndConfirmPickup(otp);

        res.status(200).json({ message: 'OTP match and Luggage transport is successfully done', luggage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTrains,
    getTrainById,
    getTrainLocations,
    addTrainLocations,
    getJourneyTime,
    submitLuggageForm,
    verifyOtp
};