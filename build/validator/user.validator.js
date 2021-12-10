"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class UserValidator {
    checkSignup() {
        return [
            (0, express_validator_1.body)('first_name').notEmpty().withMessage('Please, provide a first name'),
            (0, express_validator_1.body)('last_name').notEmpty().withMessage('Please, provide a last name'),
            (0, express_validator_1.body)('email').notEmpty().isEmail().withMessage('Please, provide a valid email'),
            (0, express_validator_1.body)('username').notEmpty().withMessage('Please, provide a username')
                .isLength({ min: 5 }).withMessage('Username must have at least 5 characters'),
            (0, express_validator_1.body)('password').notEmpty().withMessage('Please, provide a password')
                .isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
        ];
    }
    checkLogin() {
        return [
            (0, express_validator_1.body)('email').notEmpty().isEmail().withMessage('Please, provide a valid email'),
            (0, express_validator_1.body)('password').notEmpty().withMessage('Please, provide a password')
                .isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
        ];
    }
}
exports.default = new UserValidator();
