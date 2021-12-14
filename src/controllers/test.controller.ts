// import { Request, Response } from "express";
// import JobQueue from "../config/queue.config";
// import RedisClient from '../config/redis.config';
// import config from '../config/env.config';
// import jwt from 'jsonwebtoken';

// // const notifyQueue = new Queue('video transcoding', config.redisUrl);

// class TestController {
//     async create(req: Request, res: Response) {
//         try {

//             // const transporter = nodemailer.createTransport({
//             //     host: config.smtp.host,
//             //     port: Number(config.smtp.port),
//             //     secure: false,
//             //     requireTLS: true,
//             //     auth: {
//             //         user: config.smtp.auth.user,
//             //         pass: config.smtp.auth.pass
//             //     }
//             // });
//             // const message = {
//             //     from: 'Sender Name <sender@example.com>',
//             //     to: 'Recipient <recipient@example.com>',
//             //     subject: 'Bull works!',
//             //     text: 'Hello to myself!',
//             //     html: '<p><b>Hello</b> to myself!</p>'
//             // };

//             // notifyQueue.process(async (job, done) =>{

//             //     // job.data contains the custom data passed when the job was created
//             //     // job.id contains id of this job.
//             //     console.log('job', job.id, job.data);

//             //     const sentMail = await transporter.sendMail(message, (err, info) => {
//             //         if (err) {
//             //             console.log('Error occurred. ' + err.message);
//             //             return process.exit(1);
//             //         }

//             //         console.log('Message sent: %s', info.messageId);
//             //         // Preview only available when sending through an Ethereal account
//             //         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//             //     });
//             //     console.log('sentmail', sentMail)
//             //     done();
//             // });

//             // const token = await jwt.sign({email: 'exam@ge.com'}, config.jwt.secret,
//             //     { algorithm: 'HS256', expiresIn: config.jwt.expiry }
//             // )
//             // const verificationLink = `${config.host}/api/v1/email/verify/${token}`;

//             // const EmailDetails = {
//             //     to: 'Recipient <recipient@example.com>',
//             //     subject: 'Verify your email ✔',
//             //     // text: 'Hello to myself!',
//             //     html: `<p>Email Verification Link:<a>${verificationLink}</a></p>`
//             // };
//             // JobQueue.add(
//             //     'sendEmail',
//             //     {
//             //         EmailDetails,
//             //     },
//             //     {
//             //         attempts: 3,
//             //     }
//             // );            // const closed = await notifyQueue.close()


//             res.status(201).json({
//                 msg: 'test Successful',

//             })
//         } catch (error) {
//             console.log('error', error)
//             return res.status(500).json({ msg: 'test route failed', route: "/test" })
//         }
//     }
// }




// export default new TestController();
