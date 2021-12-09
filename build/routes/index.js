"use strict";
//TODO: separate out routes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
const question_1 = require("../model/question");
const questionValidator_1 = __importDefault(require("../validator/questionValidator"));
const middleware_1 = __importDefault(require("../middleware"));
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    res.send('Welcome to the Stackflow API');
});
router.post('/question/create', questionValidator_1.default.checkCreateQuestion(), middleware_1.default.handleValidationError, async (req, res) => {
    console.log(req.body);
    const { title, desc } = req.body;
    try {
        const id = (0, uuid_1.v4)();
        const user_id = (0, uuid_1.v4)();
        const questions = await question_1.QuestionInstance.create({ id, user_id, title, desc });
        res.json({
            msg: 'Question Created Successfully',
            questions
        });
    }
    catch (error) {
        return res.json({ status: 500, msg: 'failed to create question' });
    }
});
router.get('/question/read', questionValidator_1.default.checkReadTodo(), middleware_1.default.handleValidationError, async (req, res) => {
    try {
        const limit = parseInt(req.query?.limit || '10');
        const offset = parseInt(req.query?.limit || '10');
        const question = await question_1.QuestionInstance.findAll({ limit, offset });
        res.json({
            msg: 'Questions retrieved Successfully',
            question
        });
    }
    catch (error) {
        console.log(error);
        return res.json({ status: 500, msg: 'failed to retrieve question' });
    }
});
router.get('/question/read/:id', questionValidator_1.default.checkIdParam(), middleware_1.default.handleValidationError, async (req, res) => {
    try {
        const { id } = req.params;
        const question = await question_1.QuestionInstance.findOne({ where: { id } });
        res.json({
            msg: 'Question found!',
            question
        });
    }
    catch (error) {
        console.log(error);
        return res.json({ status: 500, msg: 'failed to retrieve question' });
    }
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email) {
        res.send(email.toUpperCase());
    }
    else {
        res.send('You must provide an email');
    }
});
