"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../config/env.config"));
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
}
exports.default = new AuthUtils();
