"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const question_model_1 = require("../model/question.model");
const testData_1 = require("./testData");
const database_config_1 = __importDefault(require("../config/database.config"));
// jest.useFakeTimers();
beforeAll(async () => {
    await database_config_1.default.sync({ force: true }).then(() => {
        console.log('Refreshed Test DB for Questions Test');
    });
});
// afterAll((done) => {
//     server && server.close(done);
// });
describe('Can Get / as base test case', () => {
    test('It should respond with 200 success', async () => {
        await (0, supertest_1.default)(app_1.default)
            .get('/api/v1')
            .expect(200);
    });
});
describe('Can Get /question/read', () => {
    test('It should respond with 200 success', async () => {
        const mockReadAllQuestion = jest.fn(() => testData_1.posts);
        jest
            .spyOn(question_model_1.QuestionInstance, "findAll")
            .mockImplementation(() => mockReadAllQuestion());
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/api/v1/question/read')
            .expect(200);
        console.log(response.body);
        expect(mockReadAllQuestion).toHaveBeenCalledTimes(1);
    });
});
describe('Can Get /question/read/:id', () => {
    test('It should respond with 200 success', async () => {
        const mockReadOneQuestion = jest.fn(() => testData_1.postById);
        jest
            .spyOn(question_model_1.QuestionInstance, "findOne")
            .mockImplementation(() => mockReadOneQuestion());
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/api/v1/question/read/435cbcaf-731c-47b5-925f-c486f28f3066')
            .expect(200);
        console.log(response.body);
        expect(mockReadOneQuestion).toHaveBeenCalledTimes(1);
    });
});
