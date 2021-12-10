import { Request, Response } from "express";

import { QuestionInstance } from "../model/question.model";
import { v4 as uuidv4 } from "uuid";

class QuestionController {
    async create(req: Request, res: Response) {
        const { title, desc } = req.body;
        try {
            const id = uuidv4();
            const user_id = uuidv4();
            const questions = await QuestionInstance.create({ id, user_id, title, desc });
            res.status(201).json({
                msg: 'Question Created Successfully',
                questions
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to create question', route: "/question/create" })
        }
    }

    async readPagination(req: Request, res: Response) {
        try {
            const limit = parseInt((req.query?.limit as string | undefined) || '10');
            const offset = parseInt((req.query?.limit as string | undefined) || '10');
            const questions = await QuestionInstance.findAll({ limit, offset });
            res.json({
                msg: 'Questions retrieved Successfully',
                questions
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'failed to retrieve question', route: '/questions' })
        }

    }
    async readByID(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const question = await QuestionInstance.findOne({ where: { id } });
            res.json({
                msg: 'Question found!',
                question
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'failed to retrieve question' })
        }
    }
}

export default new QuestionController();
