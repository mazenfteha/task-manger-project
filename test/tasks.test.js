const request = require('supertest');

const app = require('../src/app');
const Task = require('../src/models/task');
const { connectTestDB, disconnectTestDB } = require('../db/testDB')

beforeAll(async () => {
    await connectTestDB(); // Connect to the test database before running tests
});

afterAll(async () => {
    await disconnectTestDB(); // Disconnect from the test database after running tests
});

describe('POST and GET /api/v1/tasks - Success', () => {
    const task = {
        name: 'Test Task',
        completed: false
    }
    it('should create a new task', async ()=> {
        const response = await request(app)
        .post('/api/v1/tasks')
        .send(task);
        expect(response.status).toBe(201);
        expect(response.body.task).toBeDefined();
        expect(response.body.task.name).toBe(task.name);
        expect(response.body.task.completed).toBe(false);
        expect(response.body.task._id).toBeDefined();
        expect(response.body.task.__v).toBe(0);
    })

    it('should return all tasks', async () => {
        const response = await request(app).get('/api/v1/tasks');

        expect(response.status).toBe(200);
        expect(response.body.tasks).toBeDefined();
        expect(Array.isArray(response.body.tasks)).toBe(true);
    });
});
