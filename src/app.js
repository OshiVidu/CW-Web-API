const express = require('express');
const morgan = require('morgan');
const trainRoutes = require('./routes/trainRoutes');
const luggageRoutes = require('./routes/luggageRoutes');  // New route for luggage transport
const connectDB = require('./config/dbConfig');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1', trainRoutes);
app.use('/api/v1/luggage', luggageRoutes);  // Adding the luggage route

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message,
    });
});

module.exports = app;