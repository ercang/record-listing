const RecordFetcher = require('../src/RecordFetcher');
const ErrorCodes = require('../src/ErrorCodes');

test('Bad request data', async () => {
    const mockDbAccess = { findMatchingRecords: jest.fn() }

    const recordFetcher = new RecordFetcher({ dbAccess: mockDbAccess });

    const wrongSchema = { 'startDate': 3000 };
    const result = await recordFetcher.getRecords(wrongSchema);

    expect(result).toEqual({ error: ErrorCodes.BAD_REQUEST, records: undefined });
});

test('Bad DB access', async () => {
    const mockDbAccess = { findMatchingRecords: async () => { throw new Error('Mock Error') } }

    const recordFetcher = new RecordFetcher({ dbAccess: mockDbAccess });

    const correctSchema = {
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
    };
    const result = await recordFetcher.getRecords(correctSchema);

    expect(result).toEqual({ error: ErrorCodes.DB_ERROR, records: undefined });
});

test('Success case', async () => {
    const mockDbAccess = { findMatchingRecords: async () => { return ['test1', 'test2'] } }

    const recordFetcher = new RecordFetcher({ dbAccess: mockDbAccess });

    const correctSchema = {
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
    };
    const result = await recordFetcher.getRecords(correctSchema);

    expect(result).toEqual({ error: ErrorCodes.NO_ERROR, records: ['test1', 'test2'] });
});
