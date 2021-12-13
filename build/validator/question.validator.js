"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class QuestionValidator {
    checkCreateQuestion() {
        return [
            (0, express_validator_1.body)('title').notEmpty().withMessage('Please, provide a title'),
            (0, express_validator_1.body)('body').notEmpty().withMessage('Please, provide a title')
        ];
    }
    checkReadTodo() {
        return [
            (0, express_validator_1.query)('offset')
                .optional()
                .isNumeric()
                .withMessage('The Value should be number'),
            (0, express_validator_1.query)('limit')
                .optional()
                .isInt({ min: 1, max: 10 })
                .withMessage('The Value should be number between 1-10'),
        ];
    }
    checkIdParam() {
        return [
            (0, express_validator_1.param)('id')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isUUID(4)
                .withMessage('The value should be uuid v4'),
        ];
    }
}
exports.default = new QuestionValidator();
