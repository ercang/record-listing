const MongooseDBAccess = require('../src/MongooseDBAccess');
require('dotenv').config();

let mongooseInstance = undefined;

afterAll(() => {
    mongooseInstance.close();
});

test('initialize database connection', async () => {
    mongooseInstance = new MongooseDBAccess();
    await mongooseInstance.init();
});

test('fetch records', async () => {
    const testSchema = {
        "startDate": "2010-01-26",
        "endDate": "2030-01-01",
        "minCount": 2000,
        "maxCount": 3000
    };

    const result = await mongooseInstance.findMatchingRecords(testSchema);

    expect(typeof result).toBe('object')
    expect(result.length).toBeGreaterThan(0);
    expect(typeof result[0].createdAt).toBe('object');
    expect(typeof result[0].key).toBe('string');
    expect(typeof result[0].totalCount).toBe('number');
});

