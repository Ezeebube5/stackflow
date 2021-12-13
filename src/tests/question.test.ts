import request from "supertest";
import app from '../app';
import { QuestionInstance } from '../model/question.model';
import { questions, user, questionById, answers, questionUpdate } from './testData';
import db from '../config/database.config';
import { UserInstance } from "../model/user.model";
import AuthUtils from '../utils/authentication';
import redisClient from '../config/redis.config';
import JobQueue from "../config/queue.config";
import { AnswerInstance } from "../model/answer.model";
// jest.useFakeTimers();
jest.setTimeout(20000)

let authHeader = {};
beforeAll(async () => {
    try {
        await db.sync({ force: true }).then(async () => {
            console.log('Refreshed Test DB for Questions Test');
            // create sample user, login and get auth token for queries
            const { id, first_name, last_name, email, password, username } = user
            const hashedPassword = await AuthUtils.hashPassword(password)
            await UserInstance.create({ id, first_name, last_name, email, username, password: hashedPassword, email_verified: true })

            await QuestionInstance.bulkCreate(questions)
            await AnswerInstance.bulkCreate(answers)

            //Login test user to generate authHeader for protected routes
            const response = await request(app)
                .post('/api/v1/user/login').send(user)
                .expect(200);
            authHeader = { 'Authorization': `Bearer ${response.body.authToken}` };
        })
    } catch (error) {
        console.log('DB Sync error', error)
    }


});

afterAll(async () => {
    await JobQueue.obliterate({ force: true });
    await redisClient.shutDown();
    await db.close()
    console.log('Redis and Queue shutdown');
});

describe('Can Get / as base test case', () => {
    test('It should respond with 200 success', async () => {
        await request(app)
            .get('/api/v1')
            .expect(200);
    })
})

describe('Can Get /question/read', () => {
    test('It should respond with 200 success', async () => {
        // const mockReadAllQuestion = jest.fn((): any => questions);
        // jest
        //     .spyOn(QuestionInstance, "findAll")
        //     .mockImplementation(() => mockReadAllQuestion());

        const response = await request(app)
            .get('/api/v1/question/read')
            .expect(200);
        expect(response.body).toHaveProperty('questions');

        console.log(response.body);
        // expect(mockReadAllQuestion).toHaveBeenCalledTimes(1);

    })
})

describe('Can Get /question/read/:id', () => {
    test('It should respond with 200 success', async () => {
        // const mockReadOneQuestion = jest.fn((): any => questionById);
        // jest
        //     .spyOn(QuestionInstance, "findOne")
        //     .mockImplementation(() => mockReadOneQuestion());

        const response = await request(app)
            .get(`/api/v1/question/read/${questions[0].id}`)
            .expect(200);
        expect(response.body).toHaveProperty('question');

    })
})

describe('Can Post /question/create', () => {
    test('It should respond with 201 created', async () => {
        console.log('auth header', authHeader)
        const response = await request(app)
            .post(`/api/v1/question/create`).set(authHeader).send(questionById)
            .expect(201);
        console.log(response.body);
        expect(response.body).toHaveProperty('question');


    })
})

describe('Can Update /question/update/id', () => {
    test('It should respond with 200 updated', async () => {
        const response = await request(app)
            .post(`/api/v1/question/update/${questions[0].id}`).set(authHeader).send(questionUpdate)
            .expect(200);
        console.log(response.body);
        expect(response.body).toHaveProperty('updatedQuestion');


    })
})


describe('Can get /question/delete', () => {
    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .get(`/api/v1/question/delete/${questions[1].id}`).set(authHeader)
            .expect(200);

        console.log(response.body);

    })
})

