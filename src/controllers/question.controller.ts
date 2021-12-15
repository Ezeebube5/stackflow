import { Request, Response } from "express";

import { QuestionInstance } from "../model/question.model";
import { v4 as uuidv4 } from "uuid";
import { AnswerInstance } from "../model/answer.model";
import { SubscriptionInstance } from "../model/subscription.model";

class QuestionController {
    async create(req: Request, res: Response) {
        const { title, desc, user } = req.body;
        try {

            //Create Id and save question
            const id = uuidv4();
            const question = await QuestionInstance.create({ id, user_id: user.id, title, desc });

            // Subscribe the user to this question by default
            const subscription = await SubscriptionInstance.create({ id: uuidv4(), user_email: user.email, question_id: id });

            res.status(201).json({
                msg: 'Question Created Successfully',
                question, subscription
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to create question', route: "/question/create" })
        }
    }

    async update(req: Request, res: Response) {
        const { title, desc, user } = req.body;
        const { id } = req.params;

        try {
            //update question if created by user
            const updatedQuestion = await QuestionInstance.update({ title, desc }, { where: { user_id: user.id, id } });
            if (!updatedQuestion) return res.status(400).json({ msg: 'Question not found' });
            res.status(200).json({
                msg: 'Question Updated Successfully',
                updatedQuestion: id
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to update question', route: "/question/update" })
        }
    }

    async delete(req: Request, res: Response) {
        const { user } = req.body;
        const { id } = req.params;
        try {

            //delete question if created by user
            const deletedQuestion = await QuestionInstance.destroy({ where: { user_id: user.id, id } });
            if (!deletedQuestion) return res.status(400).json({ msg: 'Question not found' });
            res.status(200).json({
                msg: 'Question Deleted Successfully',
                deletedQuestion: id
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to delete question', route: "/question/delete" })
        }
    }
    async readPagination(req: Request, res: Response) {
        try {
            //Fetch questions with optional limit and offset 
            const limit = parseInt((req.query?.limit as string | undefined) || '10');
            const offset = parseInt((req.query?.limit as string | undefined) || '0');
            const questions = await QuestionInstance.findAll({ limit, offset });
            res.json({
                msg: 'Questions retrieved Successfully',
                questions
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to retrieve question', route: '/questions' })
        }
    }
    async readByID(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const question = await QuestionInstance.findOne({
                where: { id }, include: [
                    { model: AnswerInstance },
                ]
            });
            res.json({
                msg: 'Question found!',
                question
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to retrieve question' })
        }
    }

    async toggleSubscription(req: Request, res: Response) {
        const { user } = req.body;
        const { id, action } = req.params;
        let isSubscribed = false;
        let subscription;
        try {
            if (action === 'subscribe') {
                //find a create a subscription entry and set IsSubscribed to true if successful
                subscription = await SubscriptionInstance.findOrCreate({ where: { user_email: user.email, question_id: id }, defaults: { id: uuidv4(), user_email: user.email, question_id: id } });
                isSubscribed = subscription ? true : false;
            } else {
                subscription = await SubscriptionInstance.destroy({ where: { user_email: user.email, question_id: id } });
            }

            // if a null value was returned from any of the actions, then the subscription status wasn't changed
            if (!subscription) return res.status(400).json({ msg: 'Unable to change subscription status' });

            res.status(200).json({
                msg: 'Your subscription status has changed',
                isSubscribed,
                subscription

            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to subscribe to question', route: "/question/subscribe" })
        }
    }

    async readSubscriptions(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const subscriptions = await SubscriptionInstance.findAll({ where: { question_id: id } });
            res.json({
                msg: 'subscriptions found!',
                subscriptions
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to retrieve subscription' })
        }
    }
}

export default new QuestionController();
