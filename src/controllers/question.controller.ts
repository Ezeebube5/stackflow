import { Request, Response } from "express";

import { QuestionInstance } from "../model/question.model";
import { v4 as uuidv4 } from "uuid";
import { AnswerInstance } from "../model/answer.model";

class QuestionController {
    async create(req: Request, res: Response) {
        const { title, desc, user } = req.body;
        try {
            const id = uuidv4();
            const question = await QuestionInstance.create({ id, user_id:user.id, title, desc });
            res.status(201).json({
                msg: 'Question Created Successfully',
                question
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to create question', route: "/question/create" })
        }
    }

    async update(req: Request, res: Response) {
        const {title, desc, user } = req.body;
        const { id } = req.params;

        try {
            const updatedQuestion = await QuestionInstance.update({ title, desc }, { where: { user_id: user.id, id } } );
            if (!updatedQuestion) return res.status(400).json({ msg: 'Question not found' });
            res.status(200).json({
                msg: 'Question Updated Successfully',
                updatedQuestion
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to update question', route: "/question/update" })
        }
    }

    async delete(req: Request, res: Response) {
        const { user } = req.body;
        const {id} = req.params;
        try {
            const deletedQuestion = await QuestionInstance.destroy( { where: { user_id: user.id, id } });
            if (!deletedQuestion) return res.status(400).json({ msg: 'Question not found' });
            res.status(200).json({
                msg: 'Question Deleted Successfully',
                deletedQuestion
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to delete question', route: "/question/delete" })
        }
    }
    async readPagination(req: Request, res: Response) {
        try {
            const limit = parseInt((req.query?.limit as string | undefined) || '10');
            const offset = parseInt((req.query?.limit as string | undefined) || '0');
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
            const question = await QuestionInstance.findOne({
                where: { id }, include: [
                    { model: AnswerInstance},
                ]  });
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
