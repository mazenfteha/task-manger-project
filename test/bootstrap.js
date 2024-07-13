const { connectTestDB, disconnectTestDB, clearTestDB } = require('../db/testDB')

beforeAll(async () => {
    await connectTestDB();
});

afterAll(async () => {
    await disconnectTestDB();
});

afterEach(async () => {
    await clearTestDB();
});