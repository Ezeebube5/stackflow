"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const question_1 = require("../model/question");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    res.send('hi');
});
router.post('/question/create', async (req, res) => {
    console.log(req.body);
    try {
        const question = await question_1.QuestionInstance.create({ ...req.body });
        res.json({
            msg: 'Question Created Successfully',
            question
        });
    }
    catch (error) {
        return res.json({ status: 500, msg: 'failed to create question' });
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
