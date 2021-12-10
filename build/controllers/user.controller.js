"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_model_1 = require("../model/user.model");
const uuid_1 = require("uuid");
const authentication_1 = __importDefault(require("../utils/authentication"));
class UserController {
    async signup(req, res) {
        const { first_name, last_name, email, password, username } = req.body;
        try {
            //check if user exists with the username or email in request
            const existingUser = await user_model_1.UserInstance.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        { email },
                        { username }
                    ]
                }
            });
            if (existingUser)
                return res.status(400).json({ msg: 'Username/email already exists' });
            const id = (0, uuid_1.v4)();
            //TODO: implement email verification
            const hashedPassword = await authentication_1.default.hashPassword(password);
            const user = await user_model_1.UserInstance.create({ id, first_name, last_name, email, password: hashedPassword, username, email_verified: true });
            console.log('user', user.getDataValue('email'));
            res.status(201).json({
                msg: 'Account Created Successfully',
                user: {
                    email: user.getDataValue('email'),
                    username: user.getDataValue('username')
                }
            });
        }
        catch (error) {
            console.log('error', error);
            return res.status(500).json({ msg: 'failed to create account', route: "/user/signup" });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            //check if user exists
            const user = await user_model_1.UserInstance.findOne({
                where: { email },
                // attributes: ['first_name', 'last_name', 'email', 'username']
            });
            if (!user)
                return res.status(400).json({ msg: 'No user found with this email' }); //TODO: validation on the routes
            //compare hashed password
            console.log('passwords', password, user.getDataValue('password'));
            const passwordValid = await authentication_1.default.confirmPassword(password, user.getDataValue('password'));
            if (!passwordValid)
                return res.status(400).json({ msg: 'Incorrect Password' });
            //generate and return JWT for future requests
            const userDetails = {
                email: user.getDataValue('email'),
                first_name: user.getDataValue('first_name'),
                last_name: user.getDataValue('last_name'),
                username: user.getDataValue('username'),
            };
            const authToken = await authentication_1.default.createToken(userDetails);
            console.log('authtoken', authToken);
            res.status(200).json({
                msg: 'Login Successful!',
                user: userDetails,
                authToken
            });
        }
        catch (error) {
            console.log('error', error);
            return res.status(500).json({ msg: 'failed to create account', route: "/user/signup" });
        }
    }
}
exports.default = new UserController();
