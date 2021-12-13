"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_model_1 = require("../model/user.model");
const uuid_1 = require("uuid");
const authentication_1 = __importDefault(require("../utils/authentication"));
const redis_config_1 = __importDefault(require("../config/redis.config"));
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
            const hashedPassword = await authentication_1.default.hashPassword(password);
            const user = await user_model_1.UserInstance.create({ id, first_name, last_name, email, password: hashedPassword, username, email_verified: true });
            //TODO: create token and add to email sending queue - export this resendVerification util
            await authentication_1.default.sendEmailVerification({ id, email });
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
                id: user.getDataValue('id'),
                email: user.getDataValue('email'),
                first_name: user.getDataValue('first_name'),
                last_name: user.getDataValue('last_name'),
                username: user.getDataValue('username'),
            };
            const authToken = await authentication_1.default.createToken(userDetails);
            const cacheToken = await redis_config_1.default.saveToken(userDetails.id, authToken);
            console.log('authtoken', authToken, cacheToken);
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
    async logout(req, res) {
        const { user } = req.body;
        try {
            //remove AuthToken from redis DB to prevent further requests
            const removedToken = await redis_config_1.default.removeToken(user.id);
            console.log('removedToken', removedToken);
            res.status(200).json({
                msg: 'Logout Successful!'
            });
        }
        catch (error) {
            console.log('error', error);
            return res.status(500).json({ msg: 'failed to logout', route: "/user/logout" });
        }
    }
}
exports.default = new UserController();
