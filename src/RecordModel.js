const mongoose = require('mongoose');

/**
 * Model and schema definition for record data
 */

const recordSchema = new mongoose.Schema({
    key: String,
    value: String,
    createdAt: Date,
    counts: [Number],
});

const RecordModel = mongoose.model('record', recordSchema);

module.exports = RecordModel;
