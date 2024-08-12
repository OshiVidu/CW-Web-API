const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
 location_id: {
 type: String,
 required: true,
 unique: true,
 },
 train_id: {
 type: String,
 required: true,
 unique: true,
 },
 timestamp: {
 type: Number,
 required: true,
 },
 location: {
 latitude: {
 type: Number,
 required: true,
 },
 longitude: {
 type: Number,
 required: true,
 },
 },
 speed: {
 type: Number,
 required: true,
 },
 direction: {
 type: Number,
 required: true,
 },
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train





// const mongoose = require('mongoose');

// const trainSchema = new mongoose.Schema({
//     train_id: String,
//     timestamp: Date,
//     latitude: Number,
//     longitude: Number,
//     speed: Number,
//     direction: String,
// });

// const Train = mongoose.model('Train', trainSchema);

// module.exports = Train;