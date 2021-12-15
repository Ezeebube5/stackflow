import Queue from 'bull';
import EmailService from '../services/email.service';
import config from './env.config';

const JobQueue = new Queue('job_queue', config.redisUrl);

// Handle Email Sending With Queues
JobQueue.process('sendEmail', 25, EmailService);

export default JobQueue;