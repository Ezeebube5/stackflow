import request from "supertest";
import app from '../app';
import { QuestionInstance } from '../model/question.model';
import { questions, user, answers, answerById, answerUpdate, subscription } from './testData';
import db from '../config/database.config';
import { UserInstance } from "../model/user.model";
import AuthUtils from '../utils/authentication';
import redisClient from '../config/redis.config';
import JobQueue from "../config/queue.config";
import { AnswerInstance } from "../model/answer.model";
import { SubscriptionInstance } from "../model/subscription.model";
// jest.useFakeTimers();
jest.setTimeout(20000)

let authHeader = {};
beforeAll(async () => {
    try {
        await db.sync().then(async () => {
            console.log('Refreshed Test DB for Answers Test');
            // create sample user, login and get auth token for queries
            const { id, first_name, last_name, email, password, username } = user
            const hashedPassword = await AuthUtils.hashPassword(password)
            await UserInstance.create({ id, first_name, last_name, email, username, password: hashedPassword, email_verified: true })
            await QuestionInstance.bulkCreate(questions);
            await AnswerInstance.bulkCreate(answers);
            await SubscriptionInstance.create(subscription)
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



describe('Can Get /answer/:id', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get(`/api/v1/answer/read/${answers[0].id}`)
            .expect(200);
        expect(response.body).toHaveProperty('answer');

    })
})

describe('Can Post /answer/create', () => {
    test('It should respond with 201 created', async () => {
        console.log('auth header', authHeader)
        const response = await request(app)
            .post(`/api/v1/answer/create`).set(authHeader).send(answerById)
            .expect(201);
        console.log(response.body);
        expect(response.body).toHaveProperty('answer');
    })
})

describe('Can Update /answer/update/id', () => {
    test('It should respond with 200 updated', async () => {
        const response = await request(app)
            .post(`/api/v1/answer/update/${answers[0].id}`).set(authHeader).send(answerUpdate)
            .expect(200);
        console.log(response.body);
        expect(response.body).toHaveProperty('updatedAnswer');

    })
})

describe('Can upvote/downvote/unvote', () => {
    test('It should respond with 200 updated', async () => {
        const response = await request(app)
            .post(`/api/v1/answer/update/${answers[0].id}`).set(authHeader).send(answerUpdate)
            .expect(200);
        console.log(response.body);
        
        expect(response.body).toHaveProperty('updatedAnswer');

    })
})


describe('Can get /answer/delete', () => {
    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .get(`/api/v1/answer/delete/${answers[1].id}`).set(authHeader)
            .expect(200);

        console.log(response.body);

    })
})

