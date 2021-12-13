import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/env.config';
import JobQueue from "../config/queue.config";
import { v4 as uuidv4 } from "uuid";
import { EmailVerificationInstance } from "../model/emailVerification.model";
import { PasswordResetInstance } from '../model/passwordReset.model';

interface emailObj {
  id: string,
  email: string
}

class AuthUtils {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async confirmPassword(rawString: string, hashedString: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(rawString, hashedString);
    return isMatch;
  }

  async createToken(user: object) {
    const token = await jwt.sign(user, config.jwt.secret,
      { algorithm: 'HS256', expiresIn: config.jwt.expiry }
    )
    return token;
  }

  async verifyToken(token: string): Promise<any> {
    const verifiedToken = await jwt.verify(token, config.jwt.secret)
    console.log('delete log', verifiedToken);
    return verifiedToken;
  }

  async sendEmailVerification(emailObj: emailObj): Promise<object | null> {
    //generate random string
    try {
      const id = uuidv4();
      const token = await jwt.sign(emailObj, config.jwt.secret,
        { algorithm: 'HS256', expiresIn: config.jwt.expiry }
      )
      const verificationLink = `${config.host}/api/v1/email/verify/${token}`;

      const emailVerification = await EmailVerificationInstance.create({ id, user_email: emailObj.email, token });

      const EmailDetails = {
        to: [emailObj.email],
        subject: 'Verify your email ✔',
        html: `<p>Email Verification Link: <a>${verificationLink}</a></p>`
      };

      // add email to queue
      JobQueue.add(
        'sendEmail',
        {
          EmailDetails,
        },
        {
          attempts: 3,
        }
      );
      return { msg: 'Email Verification Sent', emailVerification }
    } catch (err) {
      console.log('sendEmailVerification Error', err);
      return null
    }
  }

  async sendPasswordResetEmail(emailObj: emailObj): Promise<object | null> {
    //generate random string
    try {
      const id = uuidv4();
      const token = await jwt.sign(emailObj, config.jwt.secret,
        { algorithm: 'HS256', expiresIn: config.jwt.expiry }
      )
      const passwordResetLink = `${config.host}/api/v1/password/new/${token}`;

      const passwordReset = await PasswordResetInstance.create({ id, user_email: emailObj.email, token });

      const EmailDetails = {
        to: [emailObj.email],
        subject: 'Reset your password',
        html: `<p>Password change Link: <a>${passwordResetLink}</a></p>`
      };

      // add email to queue
      JobQueue.add(
        'sendEmail',
        {
          EmailDetails,
        },
        {
          attempts: 3,
        }
      );
      return { msg: 'Email Verification Sent', passwordReset }
    } catch (err) {
      console.log('sendpasswordReset Error', err);
      return null
    }
  }
}

export default new AuthUtils();