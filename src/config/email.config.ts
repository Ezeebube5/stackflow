import nodemailer from 'nodemailer';
import config from '../config/env.config'
// send test email

console.log('Credentials obtained, sending message...');
interface EmailDetails {
    from: string;
    to: string;
    subject: string;
    html: string;

}

class EmailClient {
    transporter: any;

    // Create a SMTP transporter object
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.smtp.host,
            port: Number(config.smtp.port),
            secure: false,
            auth: {
                user: config.smtp.auth.user,
                pass: config.smtp.auth.pass
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


    async sendEmail(message: EmailDetails) {
        console.log('message', message);
        try {
            const sentMail = await this.transporter.sendMail(message)

            // console.log('Message sent: %s', info.messageId, info);
            // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info), sentMail);
            return nodemailer.getTestMessageUrl(sentMail);
        } catch (err) {
            console.log('Error occurred. ' + err);
            return process.exit(1);
        }
    }

}

export default new EmailClient();







