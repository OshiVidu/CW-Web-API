const itemService = require('../services/itemService');

// Controller function to handle POST request to add a new item
const addItem = async (req, res) => {
    try {
        const itemData = req.body;
        const newItem = await itemService.addItem(itemData);
        res.status(201).json({ message: 'Item added successfully', data: newItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to handle GET request to retrieve item and train details
const getItemAndTrainDetails = async (req, res) => {
    try {
        const { item_id } = req.params;
        const details = await itemService.getItemAndTrainDetails(item_id);
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addItem,
    getItemAndTrainDetails,
};