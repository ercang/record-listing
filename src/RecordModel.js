const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    key: String,
    value: String,
    createdAt: Date,
    counts: [Number],
});

const RecordModel = mongoose.model('record', recordSchema);

module.exports = RecordModel;
