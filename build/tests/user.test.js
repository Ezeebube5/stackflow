"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const testData_1 = require("./testData");
const database_config_1 = __importDefault(require("../config/database.config"));
// jest.useFakeTimers();
// let server: any, agent;
beforeAll(async () => {
    await database_config_1.default.sync({ force: true }).then(() => {
        console.log('Refreshed Test DB for Auth Test');
    });
});
describe('Test Create /user', () => {
    test('It should respond with 201 success given valid details', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/user/signup').send(testData_1.user)
            .expect(201);
        console.log('response body', response.body);
        expect(response.body.user).toEqual({ email: testData_1.user.email, username: testData_1.user.username });
    });
});
describe('Test Unable to Create /user', () => {
    test('It should respond with 400 error given incomplete details', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/user/signup').send(testData_1.invalidUser)
            .expect(400);
        expect(response.body).toEqual({
            msg: 'Please, provide a last name',
            param: 'last_name',
            location: 'body'
        });
    });
});
describe('Test Login /user', () => {
    test('It should respond with 201 success', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/user/login').send(testData_1.user)
            .expect(200);
        console.log('response body', response.body);
        expect(response.body.user).toHaveProperty('email');
    });
});
