const Location = require('../models/Location');

// Handle data submission
exports.ingestLocationData = async (req, res) => {
    const { location_id, train_id, timestamp, latitude, longitude, speed, direction } = req.body;

    const locationData = new Location({
        location_id,
        train_id,
        timestamp,
        latitude,
        longitude,
        speed,
        direction
    });

    try {
        const savedLocation = await locationData.save();
        res.status(201).json(savedLocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};