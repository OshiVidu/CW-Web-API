const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    train_id: String,
    timestamp: Date,
    latitude: Number,
    longitude: Number,
    speed: Number,
    direction: String,
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;