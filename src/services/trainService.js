const Train = require('../models/Train');
const axios = require('axios');

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
            { 'location.latitude': 1, 'location.longitude': 1, _id: 0 }
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
        const location = response.data.results[0].geometry.location;
        return {
            latitude: location.lat,
            longitude: location.lng
        };
    } catch (error) {
        throw new Error('Error fetching user coordinates: ' + error.message);
    }
};

// Function to calculate distance using the Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
};

// Service function to calculate estimated time to reach user's location
const calculateEstimatedTime = async (train_id, userCoordinates) => {
    try {
        const train = await Train.findOne({ train_id: train_id }).sort({ timestamp: -1 });
        if (!train) {
            throw new Error('Train not found');
        }

        const trainCoordinates = {
            latitude: train.location.latitude,
            longitude: train.location.longitude
        };

        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${trainCoordinates.latitude},${trainCoordinates.longitude}&destinations=${userCoordinates.latitude},${userCoordinates.longitude}&key=${apiKey}`
        );

        const element = response.data.rows[0].elements[0];

        if (element.status === 'OK') {
            return element.duration.text;
        } else if (element.status === 'ZERO_RESULTS') {
            // Fallback to Haversine formula for direct distance calculation
            const distanceInKm = calculateDistance(
                trainCoordinates.latitude,
                trainCoordinates.longitude,
                userCoordinates.latitude,
                userCoordinates.longitude
            );

            const trainSpeedInKmH = train.speed; // Assuming train speed is in km/h
            const estimatedTimeInHours = distanceInKm / trainSpeedInKmH;
            const estimatedTimeInMinutes = Math.round(estimatedTimeInHours * 60);

            return `${estimatedTimeInMinutes} mins`;
        } else {
            throw new Error(`Element status is not OK: ${element.status}`);
        }
    } catch (error) {
        throw new Error('Error calculating estimated time: ' + error.message);
    }
};

module.exports = {
    getAllTrains,
    getTrainById,
    getTrainLocations,
    addTrainLocations,
    getUserCoordinates,
    calculateEstimatedTime,
};