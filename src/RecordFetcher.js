const SchemaValidator = require('./SchemaValidator')
const ErrorCodes = require('./ErrorCodes')

class RecordFetcher {
    constructor({ dbAccess }) {
        this.dbAccess = dbAccess;
        this.schemaValidator = new SchemaValidator();
    }

    async getRecords(requestData) {
        const result = { error: ErrorCodes.ERROR, records: undefined };
        if (!this.schemaValidator.validateRecordRequestSchema(requestData)) {
            result.error = ErrorCodes.BAD_REQUEST;
            return result;
        }

        try {
            result.records = await this.dbAccess.findMatchingRecords(requestData);
            result.error = ErrorCodes.NO_ERROR;
        } catch (ex) {
            result.error = ErrorCodes.DB_ERROR;
        }

        return result;
    }
}


module.exports = RecordFetcher;
