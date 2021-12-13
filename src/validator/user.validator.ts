import { body, param } from "express-validator";


class UserValidator {
    checkSignup() {
        return [
            body('first_name').notEmpty().withMessage('Please, provide a first name'),
            body('last_name').notEmpty().withMessage('Please, provide a last name'),
            body('email').notEmpty().isEmail().withMessage('Please, provide a valid email'),
            body('username').notEmpty().withMessage('Please, provide a username')
                .isLength({ min: 5 }).withMessage('Username must have at least 5 characters'),
            body('password').notEmpty().withMessage('Please, provide a password')
                .isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),


        ]
    }

    checkLogin() {
        return [
            body('email').notEmpty().isEmail().withMessage('Please, provide a valid email'),
            body('password').notEmpty().withMessage('Please, provide a password')
                .isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
        ]
    }

    checkToken() {
        return [
            param('token').notEmpty().isLength({ min: 20 }).withMessage('Please, provide a valid link'),
        ]
    }
    checkEmail() {
        return [
            body('email').notEmpty().isEmail().withMessage('Please, provide a valid email'),
        ]
    }

    checkPassword() {
        return [
            body('password').notEmpty().withMessage('Please, provide a new password')
                .isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),]
    }
}

export default new UserValidator();