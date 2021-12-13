"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../config/env.config"));
const queue_config_1 = __importDefault(require("../config/queue.config"));
const uuid_1 = require("uuid");
const emailVerification_model_1 = require("../model/emailVerification.model");
class AuthUtils {
    async hashPassword(password) {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        return hashedPassword;
    }
    async confirmPassword(rawString, hashedString) {
        const isMatch = await bcryptjs_1.default.compare(rawString, hashedString);
        return isMatch;
    }
    async createToken(user) {
        const token = await jsonwebtoken_1.default.sign(user, env_config_1.default.jwt.secret, { algorithm: 'HS256', expiresIn: env_config_1.default.jwt.expiry });
        return token;
    }
    async verifyToken(token) {
        const verifiedToken = await jsonwebtoken_1.default.verify(token, env_config_1.default.jwt.secret);
        console.log('delete log', verifiedToken);
        return verifiedToken;
    }
    async sendEmailVerification(emailObj) {
        //generate random string
        try {
            const id = (0, uuid_1.v4)();
            const token = await jsonwebtoken_1.default.sign(emailObj, env_config_1.default.jwt.secret, { algorithm: 'HS256', expiresIn: env_config_1.default.jwt.expiry });
            const verificationLink = `${env_config_1.default.host}/api/v1/email/verify/${token}`;
            const emailVerification = await emailVerification_model_1.EmailVerificationInstance.create({ id, user_email: emailObj.email, token });
            const EmailDetails = {
                to: [emailObj.email],
                subject: 'Verify your email ✔',
                html: `<p>Email Verification Link: <a>${verificationLink}</a></p>`
            };
            // add email to queue
            queue_config_1.default.add('sendEmail', {
                EmailDetails,
            }, {
                attempts: 3,
            });
            return { msg: 'Email Verification Sent', emailVerification };
        }
        catch (err) {
            console.log('sendEmailVerification Error', err);
            return null;
        }
    }
}
exports.default = new AuthUtils();
