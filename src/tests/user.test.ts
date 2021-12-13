import request from "supertest";
import app from '../app';
import { emailVerification, invalidUser, newPassword, passwordReset, user } from './testData';
import db from '../config/database.config';
import redisClient from '../config/redis.config';
import JobQueue from "../config/queue.config";
import { EmailVerificationInstance } from "../model/emailVerification.model";
import { PasswordResetInstance } from "../model/passwordReset.model";
// jest.useFakeTimers();
jest.setTimeout(20000)
// let server: any, agent;

beforeAll(async () => {
    try {
        await db.sync({ force: true }).then(() => {
            console.log('Refreshed Test DB for Auth Test')
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


describe('Test Create /user', () => {
    test('It should respond with 201 success given valid details', async () => {
        const response = await request(app)
            .post('/api/v1/user/signup').send(user)
            .expect(201);
        console.log('response body', response.body);
        expect(response.body.user).toEqual({ email: user.email, username: user.username });

    })

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

describe('Email Verification', () => {
    test('request to resend email verification should return 200', async () => {

        const response = await request(app)
            .post('/api/v1/email/resendverification').send({ email: user.email })
            .expect(200);
        expect(response.body.msg).toEqual('Verification Email Resent!');

    })

    test('request to confirm email verification should return 200', async () => {
        const mockDestroyEmailVerification = jest.fn((): any => 1);
        jest
            .spyOn(EmailVerificationInstance, "destroy")
            .mockImplementation(() => mockDestroyEmailVerification());

        const emailToken = emailVerification.token
        const response = await request(app)
            .get(`/api/v1/email/verify/${emailToken}`)
            .expect(200);
        expect(response.body.msg).toEqual('Email Verified!');

    })
})

describe('Test Login & Logout User /user', () => {
    let authToken: string | null = null;
    test('Login should respond with 201 success', async () => {
        const response = await request(app)
            .post('/api/v1/user/login').send(user)
            .expect(200);

        console.log('response body', response.body);
        expect(response.body).toHaveProperty('authToken');
        authToken = response.body.authToken;

    })

    test('Logout should respond with 200 success', async () => {
        const response = await request(app)
            .post('/api/v1/user/logout').set({ 'Authorization': `Bearer ${authToken}` })
            .expect(200);

        console.log('response body', response.body);
        expect(response.body).toEqual({
            "msg": "Logout Successful!"
        });

    })

})


describe('Password Reset', () => {
    const resetToken = passwordReset.token
    test('request for password reset should return 200', async () => {
        const response = await request(app)
            .post('/api/v1/password/requestchange').send({ email: user.email })
            .expect(200);
        expect(response.body.msg).toEqual('Password Reset Email sent!');

    })

    test('request for password change with Auth Token should return 200', async () => {
        const mockDestroyPasswordReset = jest.fn((): any => 1);
        jest
            .spyOn(PasswordResetInstance, "destroy")
            .mockImplementation(() => mockDestroyPasswordReset());

        const response = await request(app)
            .post(`/api/v1/password/new/${resetToken}`).send(newPassword)
            .expect(200);
        expect(response.body.msg).toEqual('Your password has been changed!');

    })
})