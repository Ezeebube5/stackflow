//TODO: separate out routes

import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from "uuid";

import { QuestionInstance } from '../model/question';
import questionValidator from '../validator/questionValidator';
import middleware from '../middleware';
const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Stackflow API');
});

router.post('/question/create', questionValidator.checkCreateQuestion(), middleware.handleValidationError,
    async (req: Request, res: Response) => {
        console.log(req.body);
        const { title, desc } = req.body;
        try {
            const id = uuidv4();
            const user_id = uuidv4();
            const questions = await QuestionInstance.create({ id, user_id, title, desc });
            res.json({
                msg: 'Question Created Successfully',
                questions
            })
        } catch (error) {
            return res.json({ status: 500, msg: 'failed to create question' })
        }
    });

router.get('/question/read', questionValidator.checkReadTodo(), middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {

            const limit = parseInt((req.query?.limit as string | undefined) || '10');
            const offset = parseInt((req.query?.limit as string | undefined) || '10');
            const question = await QuestionInstance.findAll({ limit, offset });
            res.json({
                msg: 'Questions retrieved Successfully',
                question
            })
        } catch (error) {
            console.log(error);
            return res.json({ status: 500, msg: 'failed to retrieve question' })
        }
    });

router.get('/question/read/:id', questionValidator.checkIdParam(), middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const question = await QuestionInstance.findOne({ where: { id } });
            res.json({
                msg: 'Question found!',
                question
            })
        } catch (error) {
            console.log(error);
            return res.json({ status: 500, msg: 'failed to retrieve question' })
        }
    });

router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email) {
        res.send(email.toUpperCase());
    } else {
        res.send('You must provide an email')
    }
});

export { router };