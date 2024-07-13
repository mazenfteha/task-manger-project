const request = require('supertest');
const app = require('../../src/app');
const Task = require('../../src/models/task')

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
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('success');
        expect(response.body.success).toBe(true);
        expect(response.body.data.name).toBe(task.name);
        expect(response.body.data.completed).toBe(false);
        expect(response.body.data._id).toBeDefined();
        expect(response.body.data.__v).toBe(0);
    })


    it('should return all tasks', async () => {
        const response = await request(app).get('/api/v1/tasks');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});

describe('POST /api/v1/tasks - Failure ' , () => {
    it('should not create a new task with invalid data', async () => {
        const invalidTask = {
            name: 12, // Invalid name
            completed: false
        };
        const response = await request(app)
        .post('/api/v1/tasks')
        .send(invalidTask);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');

    });
})

describe('GET , Update , Delete  /api/v1/tasks/get-single-task/:id - Success and Failure', () => {
    let task;

    beforeEach(async () => {
        task = await Task.create({ name: 'Test Task', completed: false });
    });

    afterEach(async () => {
        await Task.deleteMany();
    });

    it('should return a task by valid ID' , async () => {
        const res = await request(app).get(`/api/v1/tasks/get-single-task/${task._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toMatchObject({
            name: 'Test Task',
            completed: false,
        });
    })

    it('should return a 400 error for an invalid ID format' , async () => {
        const res = await request(app).get(`/api/v1/tasks/get-single-task/invalid-id`);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'Bad request');
        expect(res.body).toHaveProperty('message');
    })

    it('should return a 400 error for an invalid ID format' , async () => {
        const validButNonexistentId = '60f8f28754d2b824d8b643d1';
        const res = await request(app).get(`/api/v1/tasks/get-single-task/${validButNonexistentId}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('status', 'not found');
        expect(res.body).toHaveProperty('message', `Task not found with ID: ${validButNonexistentId}`);
    })

    it('should update a task by valid ID' , async () => {
        const updatedTask = { name: 'Updated Task', completed: true };
        const res = await request(app).patch(`/api/v1/tasks/update-task/${task._id}`).send(updatedTask);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('task');
        expect(res.body.task).toMatchObject(updatedTask);
    })

    it('should return a 400 error for an invalid ID format', async () => {
        const res = await request(app).patch('/api/v1/tasks/update-task/invalid-task-id').send({name: 'Updated Task', completed: true });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'Bad request');
    });

    it('should delete a task by valid ID', async () => {
        const res = await request(app).delete(`/api/v1/tasks/delete-task/${task._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('task');
        expect(res.body.task).toMatchObject({
            name: 'Test Task', 
            completed: false
        });
    });

    it('should return a 400 error for an invalid ID format', async () => {
        const res = await request(app).delete('/api/v1/tasks/delete-task/invalid-task-id');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'Bad request');
    });
})


