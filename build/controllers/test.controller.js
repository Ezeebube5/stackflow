"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queue_config_1 = __importDefault(require("../config/queue.config"));
const env_config_1 = __importDefault(require("../config/env.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const notifyQueue = new Queue('video transcoding', config.redisUrl);
class TestController {
    async create(req, res) {
        try {
            // const transporter = nodemailer.createTransport({
            //     host: config.smtp.host,
            //     port: Number(config.smtp.port),
            //     secure: false,
            //     requireTLS: true,
            //     auth: {
            //         user: config.smtp.auth.user,
            //         pass: config.smtp.auth.pass
            //     }
            // });
            // const message = {
            //     from: 'Sender Name <sender@example.com>',
            //     to: 'Recipient <recipient@example.com>',
            //     subject: 'Bull works!',
            //     text: 'Hello to myself!',
            //     html: '<p><b>Hello</b> to myself!</p>'
            // };
            // notifyQueue.process(async (job, done) =>{
            //     // job.data contains the custom data passed when the job was created
            //     // job.id contains id of this job.
            //     console.log('job', job.id, job.data);
            //     const sentMail = await transporter.sendMail(message, (err, info) => {
            //         if (err) {
            //             console.log('Error occurred. ' + err.message);
            //             return process.exit(1);
            //         }
            //         console.log('Message sent: %s', info.messageId);
            //         // Preview only available when sending through an Ethereal account
            //         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            //     });
            //     console.log('sentmail', sentMail)
            //     done();
            // });
            const token = await jsonwebtoken_1.default.sign({ email: 'exam@ge.com' }, env_config_1.default.jwt.secret, { algorithm: 'HS256', expiresIn: env_config_1.default.jwt.expiry });
            const verificationLink = `${env_config_1.default.host}/api/v1/email/verify/${token}`;
            const EmailDetails = {
                to: 'Recipient <recipient@example.com>',
                subject: 'Verify your email ✔',
                // text: 'Hello to myself!',
                html: `<p>Email Verification Link:<a>${verificationLink}</a></p>`
            };
            queue_config_1.default.add('sendEmail', {
                EmailDetails,
            }, {
                attempts: 3,
            }); // const closed = await notifyQueue.close()
            res.status(201).json({
                msg: 'test Successful',
            });
        }
        catch (error) {
            console.log('error', error);
            return res.status(500).json({ msg: 'test route failed', route: "/test" });
        }
    }
}
exports.default = new TestController();
