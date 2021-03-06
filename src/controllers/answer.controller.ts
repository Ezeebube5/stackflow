import { Request, Response } from "express";

import { QuestionInstance } from "../model/question.model";
import { v4 as uuidv4 } from "uuid";
import { AnswerInstance } from "../model/answer.model";
import { SubscriptionInstance } from "../model/subscription.model";
import EmailUtils from '../utils/email'
import { VoteInstance } from "../model/vote.model";

class AnswerController {
    async create(req: Request, res: Response) {
        const { question_id, response, user } = req.body;
        try {
            // Generate id and create an answer linked to the question id
            const id = uuidv4();
            const answer = await AnswerInstance.create({ id, user_id: user.id, question_id, response });

            //get all subscribers and inform them of answer
            const subscriptions = await SubscriptionInstance.findAll({
                where: { question_id },
                raw: true,
                attributes: ['user_email']
            });

            if (subscriptions.length > 0) {
                const subscriptionList = EmailUtils.objArrToStrArr(subscriptions)
                // send emails to subscribers
                await EmailUtils.dispatchEmail({
                    to: subscriptionList,
                    subject: `An answer is available to your question: ${question_id}`,
                    html: `<p>${response}</p>`
                });
            }

            res.status(201).json({
                msg: 'Answer Created Successfully',
                answer,
                subscriptions
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to create answer', route: "/answer/create" })
        }
    }

    async readByID(req: Request, res: Response) {
        try {
            //Get Answer ID from params and find in DB
            const { id } = req.params;
            const answer = await AnswerInstance.findOne({
                where: { id }, include: [
                    { model: QuestionInstance },
                ]
            });
            res.json({
                msg: 'Answer found!',
                answer
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to retrieve answer' })
        }
    }

    async update(req: Request, res: Response) {
        const { response, user } = req.body;
        const { id } = req.params;

        try {
            //Get Answer ID from params and update in DB if created by User
            const updatedAnswer = await AnswerInstance.update({ response }, { where: { user_id: user.id, id } });
            if (!updatedAnswer) return res.status(400).json({ msg: 'Answer not found' });
            res.status(200).json({
                msg: 'Answer Updated Successfully',
                updatedAnswer
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to update answer', route: "/answer/update" })
        }
    }

    async delete(req: Request, res: Response) {
        const { user } = req.body;
        const { id } = req.params;
        try {
            //Get Answer ID from params and delete from DB if created by User
            const deletedAnswer = await AnswerInstance.destroy({ where: { user_id: user.id, id } });
            if (!deletedAnswer) return res.status(400).json({ msg: 'Answer not found' });
            res.status(200).json({
                msg: 'Answer Deleted Successfully',
                deletedAnswer
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to delete answer', route: "/answer/delete" })
        }
    }

    async vote(req: Request, res: Response) {
        const { user } = req.body;
        const { id, action } = req.params;
        const voteAction: any = {
            'upvote': 1,
            'downvote': -1,
            'unvote': 0
        }

        try {
            //find existing user vote
            const existingVote = await VoteInstance.findOne({ where: { user_id: user.id, answer_id: id } });
            const voteId = existingVote ? existingVote.getDataValue('id') : uuidv4()

            //update or insert vote
            const vote = await VoteInstance.upsert({ id: voteId, answer_id: id, user_id: user.id, vote: voteAction[action] })
            if (!vote) return res.status(400).json({ msg: 'Unable to vote. Please, try again.' });

            res.status(200).json({
                msg: 'Voted Successfully',
                vote
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to vote for answer', route: "/answer/vote" })
        }
    }

    async getVotes(req: Request, res: Response) {
        const { id, } = req.params;
        try {
            //find existing votes
            const votes = await VoteInstance.sum('vote', { where: { answer_id: id } })

            res.status(200).json({
                msg: 'Votes Retrieved Successfully',
                votes
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to retrieve votes', route: "/answer/votes" })
        }
    }

}

export default new AnswerController();
