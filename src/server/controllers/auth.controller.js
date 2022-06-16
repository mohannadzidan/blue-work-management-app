const { successResponse, failResponse } = require("../helpers/methods")
const jwt = require('jsonwebtoken');
const { User } = require("../db");
const bcrypt = require('bcrypt');

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
        console.log(req);
        const userWithSameEmail = await User.findOne({ email: email })
        if (userWithSameEmail) {
            res.status(409).json(failResponse('EMAIL_ALREADY_EXISTS'));
            return;
        }
        const hashedPassword = await bcrypt.hash(password, SALT);

        const user = await new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        }).save();
        user.password = undefined;
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, { issuer: 'blue-work-management-app.com', subject: 'access_token', expiresIn: 86400 });
        res.status(201)
            .cookie('access_token', accessToken, { httpOnly: true, expires: new Date(Date.now() + 86400000) })
            .json(successResponse(user));
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
exports.signInEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email: email });
        if (!user) return res.status(401).json(failResponse('INCORRECT_EMAIL_OR_PASSWORD'));
        const isPasswordOk = await bcrypt.compare(password, user.password);

        if (isPasswordOk) {
            user.password = undefined;
            const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, { issuer: 'blue-work-management-app.com', subject: 'access_token', expiresIn: 86400 });
            res.cookie('access_token', accessToken, { httpOnly: true, expires: new Date(Date.now() + 86400000) }).json(successResponse(user))
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
exports.signOut = async (req, res) => {
    res.cookie('access_token', null, { httpOnly: true, expires: new Date(Date.now()) }).status(204).json();
}
