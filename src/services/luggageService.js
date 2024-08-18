// services/luggageService.js
const LuggageBooking = require('../models/LuggageBooking');
const Train = require('../models/Train');
const crypto = require('crypto');

// Generate a unique OTP
const generateOTP = () => {
    return crypto.randomBytes(3).toString('hex'); // 6-digit OTP
};

// Create a new luggage booking
const createLuggageBooking = async (departure_station, destination_station) => {
    try {
        // Find a train that matches the departure and destination stations
        const train = await Train.findOne({
            // Logic to find the correct train
            // This might involve checking the route of the train and whether it stops at the given stations
        });

        if (!train) {
            throw new Error('No train available for the selected route');
        }

        // Create a new booking with the generated OTP
        const booking = new LuggageBooking({
            booking_id: crypto.randomUUID(),
            train_id: train.train_id,
            departure_station,
            destination_station,
            otp: generateOTP(),
        });

        await booking.save();
        return booking;
    } catch (error) {
        throw new Error('Error creating luggage booking: ' + error.message);
    }
};

// Validate the OTP and update the booking status
const validateOTP = async (booking_id, otp) => {
    try {
        const booking = await LuggageBooking.findOne({ booking_id, otp });
        if (!booking) {
            throw new Error('Invalid OTP or booking ID');
        }

        // Update status to 'Completed' or similar
        booking.status = 'Completed';
        await booking.save();
        return booking;
    } catch (error) {
        throw new Error('Error validating OTP: ' + error.message);
    }
};

module.exports = {
    createLuggageBooking,
    validateOTP,
};