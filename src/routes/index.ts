//TODO: separate out routes

import { Router, Request, Response } from 'express';

import QuestionValidator from '../validator/question.validator';
import QuestionController from '../controllers/question.controller';
import UserController from '../controllers/user.controller';
import AnswerController from '../controllers/answer.controller';
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
router.post('/email/resendverification', UserValidator.checkEmail(), middleware.handleValidationError,
    UserController.resendEmailVerification);
router.get('/email/verify/:token', UserValidator.checkToken(), middleware.handleValidationError,
    UserController.checkEmailVerification);

//Password Reset
router.post('/password/requestchange', UserValidator.checkEmail(), middleware.handleValidationError,
    UserController.requestPasswordChange);
router.post('/password/new/:token', UserValidator.checkPassword(), middleware.handleValidationError,
    UserController.changePassword);


// Question Routes
router.get('/question/read', QuestionValidator.checkReadTodo(), middleware.handleValidationError,
    QuestionController.readPagination);
router.get('/question/read/:id', QuestionValidator.checkIdParam(), middleware.handleValidationError,
    QuestionController.readByID);
router.post('/question/create', middleware.isAuthenticated, QuestionValidator.checkCreateQuestion(),
    middleware.handleValidationError, QuestionController.create);
router.post('/question/update/:id', middleware.isAuthenticated, QuestionValidator.checkCreateQuestion(),
    QuestionValidator.checkIdParam(), middleware.handleValidationError, QuestionController.update);
router.get('/question/delete/:id', middleware.isAuthenticated, QuestionValidator.checkIdParam(),
    middleware.handleValidationError, QuestionController.delete);
router.get('/question/subscription/:action/:id', middleware.isAuthenticated, QuestionValidator.checkIdParam(),
    middleware.handleValidationError, QuestionController.toggleSubscription);
router.get('/question/subscriptions/:id', middleware.isAuthenticated, QuestionValidator.checkIdParam(),
    middleware.handleValidationError, QuestionController.readSubscriptions);


// Answer Routes
router.get('/answer/read/:id', QuestionValidator.checkIdParam(),
    middleware.handleValidationError, AnswerController.readByID);
router.post('/answer/create', middleware.isAuthenticated, QuestionValidator.checkAnswer(),
    middleware.handleValidationError, AnswerController.create);
router.post('/answer/update/:id', middleware.isAuthenticated, QuestionValidator.checkAnswer(),
    QuestionValidator.checkIdParam(), middleware.handleValidationError, AnswerController.update);
router.get('/answer/delete/:id', middleware.isAuthenticated, QuestionValidator.checkIdParam(),
    middleware.handleValidationError, AnswerController.delete);


export { router };