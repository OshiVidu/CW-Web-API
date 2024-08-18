// models/LuggageBooking.js
const mongoose = require('mongoose');

const luggageBookingSchema = new mongoose.Schema({
    booking_id: { type: String, required: true, unique: true },
    train_id: { type: String, required: true },
    departure_station: { type: String, required: true },
    destination_station: { type: String, required: true },
    otp: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LuggageBooking', luggageBookingSchema);