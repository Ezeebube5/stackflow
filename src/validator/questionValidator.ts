import { body, query, param } from "express-validator";


class QuestionValidator{
    checkCreateQuestion(){
        return [
            body('title').notEmpty().withMessage('Please, provide a title'),
            body('body').notEmpty().withMessage('Please, provide a title')
        ]
    }
    checkReadTodo(){
        return[
            query("limit").notEmpty().withMessage("The query limit should not be empty")
            .isInt({min: 1, max:20})
            .withMessage('The Limit Value should be a number between 1-10'),
            query('offset')
            .optional()
            .isNumeric()
            .withMessage('The Value should be number')
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