import EmailClient from '../config/email.config'
import config from '../config/env.config';

const EmailService = async (job: any, done: any) => {
    const { EmailDetails } = job.data; // template, subject, email, template specific params
    EmailDetails.from = EmailDetails.from || config.smtp.auth.user;

    try {
        for (let i = 0; i < EmailDetails.to.length; i++) {
            //Send email to each receiver in the array
            await EmailClient.sendEmail({ ...EmailDetails, to: EmailDetails.to[i] });
            // console.log('email sent to', EmailDetails.to[i]);     
        }

        done();
    } catch (err) {
        done(new Error(`error sending mail - ${EmailDetails.subject}`));
    }
};

export default EmailService;
