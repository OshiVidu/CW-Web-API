const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const trainSchema = new mongoose.Schema({
    location_id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    train_id: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: () => new Date(),
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
        min: 30, // Speed in km/h
        max: 120,
    },
    direction: {
        type: Number,
        required: true,
        min: 0, // Direction in degrees
        max: 360,
    },
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;