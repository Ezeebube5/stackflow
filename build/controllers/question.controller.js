"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const question_model_1 = require("../model/question.model");
const uuid_1 = require("uuid");
class QuestionController {
    async create(req, res) {
        const { title, desc } = req.body;
        try {
            const id = (0, uuid_1.v4)();
            const user_id = (0, uuid_1.v4)();
            const questions = await question_model_1.QuestionInstance.create({ id, user_id, title, desc });
            res.status(201).json({
                msg: 'Question Created Successfully',
                questions
            });
        }
        catch (error) {
            return res.status(500).json({ msg: 'failed to create question', route: "/question/create" });
        }
    }
    async readPagination(req, res) {
        try {
            const limit = parseInt(req.query?.limit || '10');
            const offset = parseInt(req.query?.limit || '10');
            const questions = await question_model_1.QuestionInstance.findAll({ limit, offset });
            res.json({
                msg: 'Questions retrieved Successfully',
                questions
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'failed to retrieve question', route: '/questions' });
        }
    }
    async readByID(req, res) {
        try {
            const { id } = req.params;
            const question = await question_model_1.QuestionInstance.findOne({ where: { id } });
            res.json({
                msg: 'Question found!',
                question
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'failed to retrieve question' });
        }
    }
}
exports.default = new QuestionController();
