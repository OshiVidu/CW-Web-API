require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/database');

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
const trainRoutes = require('./routes/trainRoutes');
const locationRoutes = require('./routes/locationRoutes');

app.use('/api/v1', trainRoutes);
app.use('/api/v1', locationRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});