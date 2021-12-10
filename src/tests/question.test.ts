import request from "supertest";
import app from '../app';
import { QuestionInstance } from '../model/question.model';
import {posts, postById} from './testData';
import db from '../config/database.config';

// jest.useFakeTimers();

// let server: any, agent;

beforeAll(async () => {
 await db.sync({force:true}).then(()=>{
    console.log('Refreshed Test DB for Questions Test')
})
});

// afterAll((done) => {
//     server && server.close(done);
// });

describe('Can Get / as base test case', () => {
    test('It should respond with 200 success', async () => {
        await request(app)
            .get('/api/v1')
            .expect(200);
    })
})

describe('Can Get /question/read', () => {
    test('It should respond with 200 success', async () => {
        const mockReadAllQuestion = jest.fn((): any => posts);
        jest
            .spyOn(QuestionInstance, "findAll")
            .mockImplementation(() => mockReadAllQuestion());

        const response = await request(app)
            .get('/api/v1/question/read')
            .expect(200);

        console.log(response.body);
        		expect(mockReadAllQuestion).toHaveBeenCalledTimes(1);

    })
})

describe('Can Get /question/read/:id', () => {
    test('It should respond with 200 success', async () => {
        const mockReadOneQuestion = jest.fn((): any => postById);
        jest
            .spyOn(QuestionInstance, "findOne")
            .mockImplementation(() => mockReadOneQuestion());

        const response = await request(app)
            .get('/api/v1/question/read/435cbcaf-731c-47b5-925f-c486f28f3066')
            .expect(200);

        console.log(response.body);
                		expect(mockReadOneQuestion).toHaveBeenCalledTimes(1);

    })
})
// afterAll(async () => {
//     await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
// });
// afterEach(app.close());
