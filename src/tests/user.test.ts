import request from "supertest";
import app from '../app';
import { UserInstance } from '../model/user.model';
import { invalidUser, user } from './testData';
import db from '../config/database.config';
import redisClient from '../config/redis.config';
// jest.useFakeTimers();

// let server: any, agent;

beforeAll(async () => {
    await db.sync({ force: true }).then(() => {
        console.log('Refreshed Test DB for Auth Test')
    })
});

afterAll(async () => {
   await redisClient.shutDown();
   console.log('redis shutdown');
});


describe('Test Create /user', () => {
    test('It should respond with 201 success given valid details', async () => {
        const response = await request(app)
            .post('/api/v1/user/signup').send(user)
            .expect(201);

        console.log('response body', response.body);
        expect(response.body.user).toEqual({ email: user.email, username: user.username });

    })

})

describe('Test Unable to Create /user', () => {
    test('It should respond with 400 error given incomplete details', async () => {
        const response = await request(app)
            .post('/api/v1/user/signup').send(invalidUser)
            .expect(400);
        expect(response.body).toEqual({
            msg: 'Please, provide a last name',
            param: 'last_name',
            location: 'body'
        });


    })

})


describe('Test Login /user', () => {
    test('It should respond with 201 success', async () => {
        const response = await request(app)
            .post('/api/v1/user/login').send(user)
            .expect(200);

        console.log('response body', response.body);
        expect(response.body.user).toHaveProperty('email');

    })

})

