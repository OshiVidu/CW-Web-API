const Train = require('../models/Train');
const Luggage = require('../models/Luggage');
const axios = require('axios');
const crypto = require('crypto');

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
        const locations = await Train.find(
            { train_id: train_id },
            { 'latitude': 1, 'longitude': 1, _id: 0 }
        ).sort({ timestamp: -1 });
        return locations;
    } catch (error) {
        throw new Error('Error fetching train locations: ' + error.message);
    }
};

// Service function to save multiple location data
const addTrainLocations = async (locationsData) => {
    try {
        // Use insertMany to save all location objects in the array at once
        const newLocations = await Train.insertMany(locationsData);
        return newLocations;
    } catch (error) {
        throw new Error('Error adding train locations: ' + error.message);
    }
};

// Service function to get latitude and longitude of a user's location
const getUserCoordinates = async (userLocation) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(userLocation)}&key=${apiKey}`
        );
        if (response.data.results.length === 0) {
            throw new Error('No results found for the given address');
        }
        const location = response.data.results[0].geometry.location;
        console.log(`Fetched coordinates: ${location.lat}, ${location.lng}`);
        return {
            latitude: location.lat,
            longitude: location.lng
        };
    } catch (error) {
        console.error('Error fetching user coordinates:', error.message);
        throw new Error('Error fetching user coordinates: ' + error.message);
    }
};

// Service function to get location name from latitude and longitude
const getLocationName = async (latitude, longitude) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );
        
        if (response.data.results.length === 0) {
            throw new Error('No results found for the given coordinates');
        }

        // Get the formatted address from the first result
        const locationName = response.data.results[0].formatted_address;
        return locationName;
    } catch (error) {
        console.error('Error fetching location name:', error.message);
        throw new Error('Error fetching location name: ' + error.message);
    }
};

//Service function to get overall Journey time
const getJourneyTime = async (departureLocation, arrivalLocation) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(departureLocation)}&destination=${encodeURIComponent(arrivalLocation)}&key=${apiKey}`
        );
        
        const route = response.data.routes[0];
        if (route) {
            const duration = route.legs[0].duration.text; // Estimated travel time
            return duration;
        } else {
            throw new Error('No route found');
        }
    } catch (error) {
        throw new Error('Error fetching journey time: ' + error.message);
    }
};

// Service function to save luggage transport details
const saveLuggageDetails = async (luggageData) => {
    try {
        // Generate a random OTP
        const otp = crypto.randomBytes(3).toString('hex');

        // Create a new luggage document
        const newLuggage = new Luggage({ ...luggageData, otp });
        await newLuggage.save();

        // Return the saved luggage document with the OTP
        return { luggage: newLuggage, otp };
    } catch (error) {
        throw new Error('Error saving luggage details: ' + error.message);
    }
};

const getAvailableTrainsByDate = async (date) => {
    try {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        console.log("Filtering trains between:", startDate, "and", endDate);

        const availableTrains = await Train.find({
            timestamp: { $gte: startDate, $lte: endDate }
        });

        console.log("Available trains found:", availableTrains);

        return availableTrains;
    } catch (error) {
        throw new Error('Error fetching trains by date: ' + error.message);
    }
};

// Service function to verify OTP and confirm pickup
const verifyOtpAndConfirmPickup = async (otp) => {
    try {
        const luggage = await Luggage.findOne({ otp });

        if (!luggage) {
            throw new Error('Invalid OTP');
        }

        // Mark the luggage as picked up
        luggage.isPickedUp = true;
        await luggage.save();

        return luggage;
    } catch (error) {
        throw new Error('Error verifying OTP: ' + error.message);
    }
};

module.exports = {
    getAllTrains,
    getTrainById,
    getTrainLocations,
    addTrainLocations,
    getUserCoordinates,
    getLocationName,
    getJourneyTime,
    saveLuggageDetails,
    getAvailableTrainsByDate,
    verifyOtpAndConfirmPickup
};