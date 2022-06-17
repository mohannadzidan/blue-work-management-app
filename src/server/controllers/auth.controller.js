const { successResponse, failResponse, safeUser } = require("../helpers/methods")
const jwt = require('jsonwebtoken');
const { User } = require("../db");
const bcrypt = require('bcrypt');
const { sendConfirmationEmail, sendResetPasswordEmail } = require('../emails');
const SALT = parseInt(process.env.SALT)
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.signUpEmailAndPassword = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const userWithSameEmail = await User.findOne({ email: email })
        if (userWithSameEmail) {
            res.status(409).json(failResponse('EMAIL_ALREADY_EXISTS'));
            return;
        }
        // verification token lives for an hour
        const verificationToken = jwt.sign({ email: email }, process.env.SECRET, { issuer: 'blue-work-management-app.com', subject: 'email_verification_token', expiresIn: 3600 });
        const verificationUrl = process.env.APP_URL + '/verification?token=' + verificationToken;
        const confirmationMail = await sendConfirmationEmail(email, verificationUrl);
        if (confirmationMail.status !== 200) throw confirmMailStatus;
        const hashedPassword = await bcrypt.hash(password, SALT);
        await new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            emailVerified: false,
        }).save();
        res.status(201).json(successResponse({
            email: email
        }));
    } catch (e) {
        res.status(500).json(failResponse('INTERNAL_ERROR'));
        console.error(e);
    }

}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const userWithSameEmail = await User.findOne({ email: email })
        if (!userWithSameEmail) {
            return res.status(404).json(failResponse('USER_NOT_FOUND'));
        }
        // password reset token lives for 15 minutes
        const passwordResetToken = jwt.sign({ email: email }, process.env.SECRET, { issuer: 'blue-work-management-app.com', subject: 'password_reset_token', expiresIn: 900 });
        const passwordResetUrl = process.env.APP_URL + '/password-reset?token=' + passwordResetToken;
        const passwordResetMail = await sendResetPasswordEmail(email, passwordResetUrl);
        if (passwordResetMail.status !== 200) throw new Error(passwordResetMail);
        res.status(201).json(successResponse({ email: email }));
    } catch (e) {
        res.status(500).json(failResponse('INTERNAL_ERROR'));
        console.error(e);
    }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.validatePasswordResetToken = async (req, res) => {
    try {
        const { token: tokenString } = req.body;
        try {
            var token = jwt.verify(tokenString, process.env.SECRET);
            if (token.sub !== 'password_reset_token') throw new Error();
            res.status(201).json(successResponse({
                email: token.email
            }));
        } catch {
            return res.status(400).json(failResponse('INVALID_TOKEN'));
        }
    } catch (e) {
        res.status(500).json(failResponse('INTERNAL_ERROR'));
        console.error(e);
    }
}
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.resetPassword = async (req, res) => {
    try {
        const { token: tokenString, newPassword } = req.body;
        try {
            var token = jwt.verify(tokenString, process.env.SECRET);
            if (token.sub !== 'password_reset_token') throw new Error();
        } catch {
            return res.status(400).json(failResponse('INVALID_TOKEN'));
        }
        const user = await User.findOne({ email: token.email });
        if (!user) {
            return res.status(404).json(failResponse('USER_NOT_FOUND'));
        }
        const hashedPassword = await bcrypt.hash(newPassword, SALT);
        user.password = hashedPassword;
        await user.save();
        res.status(201).json(successResponse({
            email: token.email
        }));
    } catch (e) {
        res.status(500).json(failResponse('INTERNAL_ERROR'));
        console.error(e);
    }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.signInEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(401).json(failResponse('INCORRECT_EMAIL_OR_PASSWORD'));
        const isPasswordOk = await bcrypt.compare(password, user.password);
        if (isPasswordOk && user.emailVerified) {
            const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, { issuer: 'blue-work-management-app.com', subject: 'access_token', expiresIn: 86400 });
            res.cookie('access_token', accessToken, { httpOnly: true, expires: new Date(Date.now() + 86400000) }).json(successResponse(safeUser(user)))
        } else if (isPasswordOk) {
            res.status(403).json(failResponse('EMAIL_NOT_VERIFIED'));
        } else {
            res.status(401).json(failResponse('INCORRECT_EMAIL_OR_PASSWORD'));
        }
    } catch (e) {
        res.status(500).json(failResponse('INTERNAL_ERROR'));
        console.error(e);
    }
}


/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.verifyUserEmail = async (req, res) => {
    try {
        const { token: tokenString } = req.body;
        try {
            var token = jwt.verify(tokenString, process.env.SECRET);
            if (token.sub !== 'email_verification_token') throw new Error();
        } catch {
            return res.status(400).json(failResponse('INVALID_TOKEN'));
        }
        const user = await User.findOne({ email: token.email });
        if (!user) {
            return res.status(404).json(failResponse('USER_NOT_EXIST'));
        }
        user.emailVerified = true;
        await user.save();
        res.status(201).json(successResponse({
            email: token.email
        }));
    } catch (e) {
        res.json(failResponse('INTERNAL_ERROR'));
        console.error(e);
    }
}


/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.signOut = async (req, res) => {
    res.cookie('access_token', null, { httpOnly: true, expires: new Date(Date.now()) }).status(204).json();
}
