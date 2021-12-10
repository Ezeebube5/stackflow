"use strict";
//TODO: separate out routes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const question_validator_1 = __importDefault(require("../validator/question.validator"));
const question_controller_1 = __importDefault(require("../controllers/question.controller"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_validator_1 = __importDefault(require("../validator/user.validator"));
const middleware_1 = __importDefault(require("../middleware"));
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    res.send('Welcome to the Stackflow API');
});
//Authentication Routes
router.post('/user/signup', user_validator_1.default.checkSignup(), middleware_1.default.handleValidationError, user_controller_1.default.signup);
router.post('/user/login', user_validator_1.default.checkLogin(), middleware_1.default.handleValidationError, user_controller_1.default.login);
// Question Routes
router.get('/question/read', question_validator_1.default.checkReadTodo(), middleware_1.default.handleValidationError, question_controller_1.default.readPagination);
router.post('/question/create', question_validator_1.default.checkCreateQuestion(), middleware_1.default.handleValidationError, question_controller_1.default.create);
router.get('/question/read/:id', question_validator_1.default.checkIdParam(), middleware_1.default.handleValidationError, question_controller_1.default.readByID);
