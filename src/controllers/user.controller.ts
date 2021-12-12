import { Request, Response } from "express";
import { Op } from 'sequelize';
import { UserInstance } from "../model/user.model";
import { v4 as uuidv4 } from "uuid";
import AuthUtils from "../utils/authentication";
import RedisClient from '../config/redis.config';

class UserController {
    async signup(req: Request, res: Response) {
        const { first_name, last_name, email, password, username } = req.body;
        try {

            //check if user exists with the username or email in request
            const existingUser = await UserInstance.findOne({
                where: {
                    [Op.or]: [
                        { email },
                        { username }
                    ]
                }
            });
            if (existingUser) return res.status(400).json({ msg: 'Username/email already exists' });

            const id = uuidv4();
            const hashedPassword = await AuthUtils.hashPassword(password)
            const user = await UserInstance.create({ id, first_name, last_name, email, password: hashedPassword, username, email_verified: true });

            //TODO: create token and add to email sending queue - export this resendVerification util
            const verifyToken = await AuthUtils.createToken({email});


            console.log('user', user.getDataValue('email'))
            res.status(201).json({
                msg: 'Account Created Successfully',
                user: {
                    email: user.getDataValue('email'),
                    username: user.getDataValue('username')
                }
            })
        } catch (error) {
            console.log('error', error)
            return res.status(500).json({ msg: 'failed to create account', route: "/user/signup" })
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {

            //check if user exists
            const user = await UserInstance.findOne({
                where: { email },
                // attributes: ['first_name', 'last_name', 'email', 'username']
            });
            if (!user) return res.status(400).json({ msg: 'No user found with this email' }); //TODO: validation on the routes

            //compare hashed password
            console.log('passwords', password, user.getDataValue('password'))

            const passwordValid = await AuthUtils.confirmPassword(password, user.getDataValue('password'))
            if (!passwordValid) return res.status(400).json({ msg: 'Incorrect Password' })

            //generate and return JWT for future requests
            const userDetails = {
                id: user.getDataValue('id'),
                email: user.getDataValue('email'),
                first_name: user.getDataValue('first_name'),
                last_name: user.getDataValue('last_name'),
                username: user.getDataValue('username'),

            }
            const authToken = await AuthUtils.createToken(userDetails);
            const cacheToken = await RedisClient.saveToken(userDetails.id, authToken);

            console.log('authtoken', authToken, cacheToken)
            res.status(200).json({
                msg: 'Login Successful!',
                user: userDetails,
                authToken
               
            })
        } catch (error) {
            console.log('error', error)
            return res.status(500).json({ msg: 'failed to create account', route: "/user/signup" })
        }
    }

    async logout(req: Request, res: Response) {

        //TODO: get auth token from the header 
        const { email, password } = req.body;
        try {

            const getToken = await RedisClient.removeToken(email);

            console.log('authtoken', getToken)
            res.status(200).json({
                msg: 'Logout Successful!'

            })
        } catch (error) {
            console.log('error', error)
            return res.status(500).json({ msg: 'failed to logout', route: "/user/logout" })
        }
    }

}

export default new UserController();
