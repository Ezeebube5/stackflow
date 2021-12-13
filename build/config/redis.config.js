"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const env_config_1 = __importDefault(require("./env.config"));
class RedisClient {
    constructor() {
        this.redisClient = (0, redis_1.createClient)({ url: env_config_1.default.redisUrl });
        this.redisClient.connect().then(console.log('Redis DB connected!'));
        this.redisClient.on('error', (err) => { console.error('Redis DB Connection Error:', err); });
    }
    async saveToken(user_id, token) {
        return await this.redisClient.set(user_id, token);
    }
    async getToken(user_id) {
        return await this.redisClient.get(user_id);
    }
    async removeToken(user_id) {
        return await this.redisClient.getDel(user_id);
    }
    async shutDown() {
        return await this.redisClient.disconnect();
    }
}
exports.default = new RedisClient();
