//TODO: separate out routes

import { Router, Request, Response } from 'express';

import QuestionValidator from '../validator/question.validator';
import QuestionController from '../controllers/question.controller';
import UserController from '../controllers/user.controller';
import UserValidator from '../validator/user.validator';

import TestController from '../controllers/test.controller';


import middleware from '../middleware';
const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Stackflow API');
});


//Test route for sandbox testing
router.get('/test', TestController.create);


//Authentication Routes
router.post('/user/signup', UserValidator.checkSignup(), middleware.handleValidationError, UserController.signup);
router.post('/user/login', UserValidator.checkLogin(), middleware.handleValidationError, UserController.login);
router.post('/user/logout', middleware.isAuthenticated, UserController.logout);

//Email Verification
router.post('/email/resendverification', UserValidator.checkEmail(), middleware.handleValidationError, UserController.resendEmailVerification);
router.get('/email/verify/:token', UserValidator.checkToken(), middleware.handleValidationError, UserController.checkEmailVerification);

//Password Reset
router.post('/password/requestchange', UserValidator.checkEmail(), middleware.handleValidationError, UserController.requestPasswordChange);
router.post('/password/new/:token', UserValidator.checkPassword(), middleware.handleValidationError, UserController.changePassword);


// Question Routes
router.get('/question/read', QuestionValidator.checkReadTodo(), middleware.handleValidationError, QuestionController.readPagination);
router.post('/question/create', QuestionValidator.checkCreateQuestion(), middleware.handleValidationError, QuestionController.create);
router.get('/question/read/:id', QuestionValidator.checkIdParam(), middleware.handleValidationError, QuestionController.readByID);



export { router };