//TODO: separate out routes

import { Router, Request, Response } from 'express';

import QuestionValidator from '../validator/question.validator';
import QuestionController from '../controllers/question.controller';
import UserController from '../controllers/user.controller';
import UserValidator from '../validator/user.validator';

import middleware from '../middleware';
const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Stackflow API');
});

//Authentication Routes
router.post('/user/signup', UserValidator.checkSignup(), middleware.handleValidationError, UserController.signup);
router.post('/user/login', UserValidator.checkLogin(), middleware.handleValidationError,  UserController.login);


// Question Routes
router.get('/question/read', QuestionValidator.checkReadTodo(), middleware.handleValidationError, QuestionController.readPagination);
router.post('/question/create', QuestionValidator.checkCreateQuestion(), middleware.handleValidationError, QuestionController.create);
router.get('/question/read/:id', QuestionValidator.checkIdParam(), middleware.handleValidationError,QuestionController.readByID);



export { router };