// src/models/Luggage.js
const mongoose = require('mongoose');

const LuggageSchema = new mongoose.Schema({
    senderName: String,
    receiverName: String,
    receiverEmail: String,
    receiverPhone: String,
    date: Date,
    dropOffLocation: String,
    pickupLocation: String,
    otp: String,
    isPickedUp: { type: Boolean, default: false }
});

module.exports = mongoose.model('Luggage', LuggageSchema);