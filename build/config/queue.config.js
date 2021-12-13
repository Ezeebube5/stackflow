"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __importDefault(require("bull"));
const email_service_1 = __importDefault(require("../services/email.service"));
const env_config_1 = __importDefault(require("./env.config"));
const JobQueue = new bull_1.default('job_queue', env_config_1.default.redisUrl);
JobQueue.process('sendEmail', 25, email_service_1.default);
exports.default = JobQueue;
