const Train = require('../models/train');
const Location = require('../models/location');

// Get all trains
exports.getAllTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.status(200).json(trains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get specific train
exports.getTrainById = async (req, res) => {
    try {
        const train = await Train.findById(req.params.train_id);
        if (!train) return res.status(404).json({ message: "Train not found" });
        res.status(200).json(train);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get live location details of specific train
exports.getTrainLocations = async (req, res) => {
    try {
        const locations = await Location.find({ train_id: req.params.train_id }).sort({ timestamp: -1 }).limit(1);
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};