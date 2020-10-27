const Server = require('../src/Server');

let serverInstance = undefined;

afterAll(() => {
    serverInstance.close();
});

test('init server', async () => {
    serverInstance = new Server();
    await serverInstance.init();
});

test('get records', async () => {
    const mockReq = { body: { startDate: '2000-01-26', endDate: '2020-02-02', minCount: 2000, maxCount: 3000 } };
    const mockRes = { send: jest.fn(), status: jest.fn() }

    await serverInstance.handleRecordPostRequest(mockReq, mockRes);

    expect(mockRes.status.mock.calls[0][0]).toBe(200);

    const sendData = mockRes.send.mock.calls[0][0];
    expect(sendData.code).toBe(0);
    expect(sendData.msg).toBe('Success');
    expect(typeof sendData.records).toBe('object');
});
