"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const authentication_1 = __importDefault(require("../utils/authentication"));
const redis_config_1 = __importDefault(require("../config/redis.config"));
class Middleware {
    handleValidationError(req, res, next) {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array()[0]);
        }
        next();
    }
    async isAuthenticated(req, res, next) {
        try {
            const authToken = req.headers.authorization?.split(' ');
            //return an error if authToken is not supplied
            if (!authToken || !authToken[1]) {
                return res.status(401).json('Not Authentcated! Please, Login');
            }
            // decode JWT and obtain the user object
            const verifiedUser = await authentication_1.default.verifyToken(authToken[1]);
            console.log('authtoken', authToken);
            console.log('authtoken', authToken, verifiedUser, typeof verifiedUser);
            const tokenValid = await redis_config_1.default.getToken(verifiedUser.id);
            if (verifiedUser && verifiedUser.id && tokenValid) {
                req.body.user = verifiedUser;
                next();
            }
            else {
                return res.status(401).json({ msg: 'Not Authenticated! Please, Login' });
            }
        }
        catch (err) {
            console.log('Auth err', err);
            return res.status(401).json({ msg: 'Authentication Error! Please, Login' });
        }
    }
}
exports.default = new Middleware();
