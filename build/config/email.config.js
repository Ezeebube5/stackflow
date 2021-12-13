"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = __importDefault(require("../config/env.config"));
// send test email
console.log('Credentials obtained, sending message...');
class EmailClient {
    // Create a SMTP transporter object
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: env_config_1.default.smtp.host,
            port: Number(env_config_1.default.smtp.port),
            secure: false,
            auth: {
                user: env_config_1.default.smtp.auth.user,
                pass: env_config_1.default.smtp.auth.pass
            }
        });
    }
    // Message object
    // const message = {
    //     from: 'Sender Name <sender@example.com>',
    //     to: 'Recipient <recipient@example.com>',
    //     subject: 'Nodemailer is unicode friendly ✔',
    //     text: 'Hello to myself!',
    //     html: '<p><b>Hello</b> to myself!</p>'
    // };
    async sendEmail(message) {
        console.log('message', message);
        const sentMail = await this.transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
            console.log('Message sent: %s', info.messageId, info);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info), sentMail);
            return nodemailer_1.default.getTestMessageUrl(info);
        });
        return sentMail;
    }
}
exports.default = new EmailClient();
