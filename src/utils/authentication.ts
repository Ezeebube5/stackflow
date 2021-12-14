import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/env.config';
import JobQueue from "../config/queue.config";
import { v4 as uuidv4 } from "uuid";
import { EmailVerificationInstance } from "../model/emailVerification.model";
import { PasswordResetInstance } from '../model/passwordReset.model';
import EmailUtils from '../utils/email'

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

  createToken(user: object):any {
    const token = jwt.sign(user, config.jwt.secret,
      { algorithm: 'HS256', expiresIn: config.jwt.expiry }
    )
    return token;
  }

   verifyToken(token: string):any {
    const verifiedToken = jwt.verify(token, config.jwt.secret)
    console.log('delete log', verifiedToken);
    return verifiedToken;
  }

  async sendEmailVerification(emailObj: emailObj): Promise<object | null> {
    //generate random string
    try {
      const id = uuidv4();
      const token = this.createToken(emailObj);
      const verificationLink = `${config.host}/api/v1/email/verify/${token}`;

      const emailVerification = await EmailVerificationInstance.create({ id, user_email: emailObj.email, token });

      // add email to queue
      const EmailDispatch = await EmailUtils.dispatchEmail({
        to: [emailObj.email],
        subject: 'Verify your email ✔',
        html: `<p>Email Verification Link: <a>${verificationLink}</a></p>`
      });
            
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
      const token = this.createToken(emailObj);

      const passwordResetLink = `${config.host}/api/v1/password/new/${token}`;

      const passwordReset = await PasswordResetInstance.create({ id, user_email: emailObj.email, token });

       // add email to queue
      const EmailDispatch = await EmailUtils.dispatchEmail({
        to: [emailObj.email],
        subject: 'Reset your password',
        html: `<p>Password change Link: <a>${passwordResetLink}</a></p>`
      });
       

     
      return { msg: 'Email Verification Sent', passwordReset }
    } catch (err) {
      console.log('sendpasswordReset Error', err);
      return null
    }
  }
}

export default new AuthUtils();