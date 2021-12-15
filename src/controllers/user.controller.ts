import { Request, Response } from "express";
import { Op } from 'sequelize';
import { UserInstance } from "../model/user.model";
import { v4 as uuidv4 } from "uuid";
import AuthUtils from "../utils/authentication";
import RedisClient from '../config/redis.config';
import { EmailVerificationInstance } from "../model/emailVerification.model";
import { PasswordResetInstance } from "../model/passwordReset.model";


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

            //create id, hash password, and save user 
            const id = uuidv4();
            const hashedPassword = await AuthUtils.hashPassword(password)
            const user = await UserInstance.create({ id, first_name, last_name, email, password: hashedPassword, username, email_verified: false });

            await AuthUtils.sendEmailVerification({ id, email });

            res.status(201).json({
                msg: 'Account Created Successfully',
                user: {
                    email: user.getDataValue('email'),
                    username: user.getDataValue('username')
                }
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to create account', route: "/user/signup" })
        }
    }

    async resendEmailVerification(req: Request, res: Response) {
        const { email } = req.body;
        try {

            //check if user exists with email in request 
            const user = await UserInstance.findOne({ where: { email } });
            if (!user) return res.status(400).json({ msg: 'Email not found' });

            // Has user been verified already?
            if (user.getDataValue('email_verified')) return res.status(400).json({ msg: 'Email verified already' });

            //Resend Verification Email
            await AuthUtils.sendEmailVerification({ id: user.getDataValue('id'), email });

            res.status(200).json({
                msg: 'Verification Email Resent!',
                email
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to resend email', route: "/email/resendverification" })
        }
    }

    async checkEmailVerification(req: Request, res: Response) {
        const { token } = req.params;
        try {

            //verify JWT
            const verifiedToken = await AuthUtils.verifyToken(token)
            if (!verifiedToken) return res.status(400).json({ msg: 'Email Link Expired' });

            // delete verification token and abort operation if token doesn't exist
            const verificationData = await EmailVerificationInstance.destroy({ where: { token } })
            if (!verificationData) return res.status(400).json({ msg: 'Unable to verify email, please try again' });

            //update user email verification status
            const user = await UserInstance.update({ email_verified: true }, { where: { email: verifiedToken.email } });

            res.status(200).json({
                msg: 'Email Verified!',


            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to verify email. Please, try again', route: "/email/resendverification" })
        }
    }
    async requestPasswordChange(req: Request, res: Response) {
        const { email } = req.body;
        try {

            //check if user exists with email in request
            const user = await UserInstance.findOne({ where: { email } });
            if (!user) return res.status(400).json({ msg: 'Email not found' });

            await AuthUtils.sendPasswordResetEmail({ id: user.getDataValue('id'), email });

            res.status(200).json({
                msg: 'Password Reset Email sent!',
                email
            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to resend email', route: "/email/resendverification" })
        }
    }

    async changePassword(req: Request, res: Response) {
        const { token } = req.params;
        const { password } = req.body;
        try {

            //verify JWT
            const verifiedToken = await AuthUtils.verifyToken(token)
            if (!verifiedToken) return res.status(400).json({ msg: 'Password Reset Link Expired' });

            // delete reset token and abort operation if token doesn't exist
            const resetData = await PasswordResetInstance.destroy({ where: { token } })
            if (!resetData) return res.status(400).json({ msg: 'Unable to reset password, please try again' });


            //update user password given valid row was found in Password Resets
            const hashedPassword = await AuthUtils.hashPassword(password)
            const user = await UserInstance.update({ password: hashedPassword }, { where: { email: verifiedToken.email } });

            res.status(200).json({
                msg: 'Your password has been changed!',

            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to verify email. Please, try again', route: "/email/resendverification" })
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {

            //check if user exists
            const user = await UserInstance.findOne({ where: { email } });
            if (!user) return res.status(400).json({ msg: 'No user found with this email' });
            if (!user.getDataValue('email_verified')) return res.status(400).json({ msg: 'No user found with this email' })

            //compare hashed password
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

            res.status(200).json({
                msg: 'Login Successful!',
                user: userDetails,
                authToken

            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to create account', route: "/user/signup" })
        }
    }

    async logout(req: Request, res: Response) {
        const { user } = req.body;
        try {
            //remove AuthToken from redis DB to prevent further requests
            const removedToken = await RedisClient.removeToken(user.id);

            res.status(200).json({
                msg: 'Logout Successful!'

            })
        } catch (error) {
            return res.status(500).json({ msg: 'failed to logout', route: "/user/logout" })
        }
    }

}

export default new UserController();
