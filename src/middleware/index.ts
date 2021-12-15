import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import AuthUtils from "../utils/authentication";
import RedisClient from '../config/redis.config';

class Middleware {
	handleValidationError(req: Request, res: Response, next: NextFunction) {

		//Abort Request if validation error exists
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json(error.array()[0]);
		}
		next();
	}

	async isAuthenticated(req: Request, res: Response, next: NextFunction) {
		try {
			const authToken = req.headers.authorization?.split(' ')
			//return an error if authToken is not supplied
			if (!authToken || !authToken[1]) {
				return res.status(401).json('Not Authenticated! Please, Login');
			}

			// decode JWT and obtain the user object
			const verifiedUser = await AuthUtils.verifyToken(authToken[1]);
			const tokenValid = await RedisClient.getToken(verifiedUser.id);

			// Proceed if JWT is verified and exists in Redis Cache
			if (verifiedUser && verifiedUser.id && tokenValid) {
				req.body.user = verifiedUser;
				next();
			} else {
				return res.status(401).json({ msg: 'Not Authenticated! Please, Login' });
			}


		} catch (err) {
			return res.status(401).json({ msg: 'Authentication Error! Please, Login' });
		}
	}
}
export default new Middleware();