const SchemaValidator = require('../src/SchemaValidator');

test('Validate a correct request schema', () => {
    const correctSchema = {
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
    };

    const validator = new SchemaValidator();

    expect(validator.validateRecordRequestSchema(correctSchema)).toEqual(true);
});

test('Validate a request with wrong date', () => {
    const testSchema = {
        "startDate": "2016-01-26",
        "endDate": "2018-223-332",
        "minCount": 2700,
        "maxCount": 3000
    };

    const validator = new SchemaValidator();

    expect(validator.validateRecordRequestSchema(testSchema)).toEqual(false);

    const testSchema2 = {
        "startDate": "2016-01-26",
        "endDate": "abc",
        "minCount": 2700,
        "maxCount": 3000
    };

    expect(validator.validateRecordRequestSchema(testSchema2)).toEqual(false);

    const testSchema3 = {
        "startDate": "2016-01-26",
        "endDate": "2016-01-26",
        "minCount": 2700,
        "maxCount": 3000
    };

    expect(validator.validateRecordRequestSchema(testSchema3)).toEqual(false);
});

test('Validate a request with wrong count', () => {
    const testSchema = {
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": "3000"
    };

    const validator = new SchemaValidator();

    expect(validator.validateRecordRequestSchema(testSchema)).toEqual(false);

    const testSchema2 = {
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 2300
    };

    expect(validator.validateRecordRequestSchema(testSchema2)).toEqual(false);

    const testSchema3 = {
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": "asd"
    };

    expect(validator.validateRecordRequestSchema(testSchema3)).toEqual(false);
});