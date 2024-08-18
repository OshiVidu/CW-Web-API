// controllers/luggageController.js
const luggageService = require('../services/luggageService');

// Controller function to handle luggage booking
const bookLuggage = async (req, res) => {
    try {
        const { departure_station, destination_station } = req.body;
        const booking = await luggageService.createLuggageBooking(departure_station, destination_station);
        res.status(201).json({
            message: 'Luggage booking successful',
            booking_id: booking.booking_id,
            otp: booking.otp,
            train_id: booking.train_id,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to handle OTP validation
const validateLuggageOTP = async (req, res) => {
    try {
        const { booking_id, otp } = req.body;
        const booking = await luggageService.validateOTP(booking_id, otp);
        res.status(200).json({
            message: 'OTP validated successfully',
            booking,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookLuggage,
    validateLuggageOTP,
};