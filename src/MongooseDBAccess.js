const mongoose = require('mongoose');
const RecordModel = require('./RecordModel')

/**
 * DB Access class is written with Mongoose. It is possible to implement this layer with
 * another technology when required. It is the actual class that retrieves records.
 */
class MongooseDBAccess {
    constructor() {
        this.db = undefined;
    }

    init() {
        return new Promise((resolve, reject) => {
            mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true });

            const db = mongoose.connection;
            db.on('error', () => {
                reject('error');
            });
            db.once('open', () => {
                this.db = db;
                resolve();
            });
        });
    }

    close() {
        mongoose.connection.close();
    }

    async findMatchingRecords(requestData) {
        return RecordModel.aggregate([
            // define which fields to be provided and add totalCount field for sum of "counts" array
            { $project: { _id: 0, key: 1, createdAt: 1, totalCount: { $sum: "$counts" } } },
            // add match filter for start and end dates
            { $match: { createdAt: { $gte: new Date(requestData.startDate), $lte: new Date(requestData.endDate) } } },
            // add filter for totalCount fields
            { $match: { totalCount: { $gte: requestData.minCount, $lte: requestData.maxCount } } },
        ]);
    }
}

module.exports = MongooseDBAccess;
