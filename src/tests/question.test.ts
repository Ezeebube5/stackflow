import request from "supertest";
import app from '../app';
import { QuestionInstance } from '../model/question.model';
import { questions, user, questionById, answers, questionUpdate, defaultQuestionId_1, defaultQuestionId_2 } from './testData';
import db from '../config/database.config';
import { UserInstance } from "../model/user.model";
import AuthUtils from '../utils/authentication';
import redisClient from '../config/redis.config';
import JobQueue from "../config/queue.config";
import { AnswerInstance } from "../model/answer.model";

jest.setTimeout(20000)

let authHeader = {};
beforeAll(async () => {
    try {
        await db.sync().then(async () => {
            console.log('Refreshed Test DB for Questions Test');
            // create sample DB entries, login and get auth token for queries
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
    //Disconnect JobQueue, Redis Client and Main DB

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

describe('Can Get Questions', () => {
    test('It should respond with 200 success', async () => {

        const response = await request(app)
            .get('/api/v1/question/read')
            .expect(200);
        expect(response.body).toHaveProperty('questions');



    })
})

describe('Can Get a Question by Id', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get(`/api/v1/question/read/${defaultQuestionId_1}`)
            .expect(200);


        expect(response.body).toHaveProperty('question');

    })
})

describe('Can Create Question', () => {
    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .post(`/api/v1/question/create`).set(authHeader).send(questionById)
            .expect(201);

        expect(response.body).toHaveProperty('question');


    })
})

describe('Can Update Question', () => {
    test('It should respond with 200 updated', async () => {
        const response = await request(app)
            .post(`/api/v1/question/update/${defaultQuestionId_1}`).set(authHeader).send(questionUpdate)
            .expect(200);

        expect(response.body).toHaveProperty('updatedQuestion');


    })
})


describe('Can delete a question', () => {
    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .get(`/api/v1/question/delete/${defaultQuestionId_2}`).set(authHeader)
            .expect(200);



    })
})

describe('Can subscribe to a question', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get(`/api/v1/question/subscription/subscribe/${defaultQuestionId_1}`).set(authHeader)
            .expect(200);


        expect(response.body.isSubscribed).toEqual(true);

    })
})

describe('Can get question subscriptions', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get(`/api/v1/question/subscriptions/${defaultQuestionId_1}`).set(authHeader)
            .expect(200);


        expect(response.body).toHaveProperty('subscriptions');

    })
})


describe('Can unsubscribe from a question', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get(`/api/v1/question/subscription/unsubscribe/${defaultQuestionId_1}`).set(authHeader)
            .expect(200);


        expect(response.body.isSubscribed).toEqual(false);


    })
})
