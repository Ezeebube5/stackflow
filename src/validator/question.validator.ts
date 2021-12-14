import { body, query, param } from "express-validator";


class QuestionValidator {
    checkCreateQuestion() {
        return [
            body('title').notEmpty().withMessage('Please, provide a title'),
            body('desc').notEmpty().withMessage('Please, provide a description')
        ]
    }

    checkAnswer() {
        return [
            body('response').notEmpty().withMessage('Please, provide a title'),        ]
    }
    checkReadTodo() {
        return [

            query('offset')
                .optional()
                .isNumeric()
                .withMessage('The Value should be number'),

            query('limit')
                .optional()
                .isInt({ min: 1, max: 10 })
                .withMessage('The Value should be number between 1-10'),
        ]
    }

    checkIdParam() {
        return [
            param('id')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isUUID(4)
                .withMessage('The value should be uuid v4'),
        ];
    }
}

export default new QuestionValidator();