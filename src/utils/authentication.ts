import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/env.config';


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
}

export default new AuthUtils();