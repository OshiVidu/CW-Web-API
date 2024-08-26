const Item = require('../models/items');
const Train = require('../models/Train');
const axios = require('axios');

// Function to get location name from latitude and longitude using Google Maps API
const getLocationName = async (latitude, longitude) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.results[0].formatted_address;
        } else {
            throw new Error('Unable to get location name from Google Maps API');
        }
    } catch (error) {
        throw new Error('Error fetching location name: ' + error.message);
    }
};

// Service function to add a new item
const addItem = async (itemData) => {
    try {
        // Validate if the train_id exists in the system
        const trainExists = await Train.findOne({ train_id: itemData.train_id });
        if (!trainExists) {
            throw new Error('Train ID does not exist in the system');
        }

        const newItem = new Item(itemData);
        await newItem.save();
        return newItem;
    } catch (error) {
        throw new Error('Error adding item: ' + error.message);
    }
};

// Service function to retrieve a specific item by ID and fetch the corresponding train details
const getItemAndTrainDetails = async (item_id) => {
    try {
        const item = await Item.findOne({ item_id });
        if (!item) {
            throw new Error('Item not found');
        }

        // Fetch the latest train location based on the train_id
        const trainLocation = await Train.findOne(
            { train_id: item.train_id },
            { latitude: 1, longitude: 1 }
        ).sort({ timestamp: -1 });

        if (!trainLocation) {
            throw new Error('No location data found for this train');
        }

        // Get the human-readable location name using Google Maps API
        const locationName = await getLocationName(trainLocation.latitude, trainLocation.longitude);

        return {
            item,
            train_id: item.train_id,
            trainLocation: {
                latitude: trainLocation.latitude,
                longitude: trainLocation.longitude,
                locationName
            }
        };
    } catch (error) {
        throw new Error('Error fetching item and train details: ' + error.message);
    }
};

module.exports = {
    addItem,
    getItemAndTrainDetails,
};