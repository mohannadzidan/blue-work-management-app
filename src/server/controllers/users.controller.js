const { successResponse, failResponse } = require("../helpers/methods")
const { User } = require("../db");


/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.me = (req, res) => {
    const { id } = req.user;
    User.findOne({ _id: id })
        .then(user => {
            if (user){
                user.password = undefined;
                res.json(successResponse(user))
            }else{
                res.status(401).cookie('access_token', null, { httpOnly: true, expires: new Date(Date.now()) }).json(failResponse('UNAUTHORIZED'))
            }
        })
        .catch(e => {
            res.status(500).json(failResponse('INTERNAL_ERROR'));
            console.error(e);
        })
}
