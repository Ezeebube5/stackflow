"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_config_1 = __importDefault(require("../config/email.config"));
const env_config_1 = __importDefault(require("../config/env.config"));
const EmailService = async (job, done) => {
    const { EmailDetails } = job.data; // template, subject, email, template specific params
    EmailDetails.from = EmailDetails.from || env_config_1.default.smtp.auth.user;
    try {
        for (let i = 0; i < EmailDetails.to.length; i++) {
            //Send email to each receiver in the array
            await email_config_1.default.sendEmail({ ...EmailDetails, to: EmailDetails.to[i] });
            console.log('email sent to', EmailDetails.to[i]);
        }
        done();
    }
    catch (err) {
        done(new Error(`error sending mail - ${EmailDetails.subject}`));
    }
};
exports.default = EmailService;
