
const Joi = require('joi');

class SchemaValidator {
    constructor() {
        this.recordRequestSchema = Joi.object().keys({
            startDate: Joi.date().required(),
            endDate: Joi.date().greater(Joi.ref('startDate')).required(),
            minCount: Joi.number().strict().required(),
            maxCount: Joi.number().strict().greater(Joi.ref('minCount')).required(),
        });

    }
    validateRecordRequestSchema(objToValidate) {
        const { error } = this.recordRequestSchema.validate(objToValidate)
        return error === undefined
    }
}

module.exports = SchemaValidator;
