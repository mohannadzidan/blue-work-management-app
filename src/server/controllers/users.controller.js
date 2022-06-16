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
            user.password = undefined;
            res.json(successResponse(user))
        })
        .catch(e => {
            res.status(500).json(failResponse('INTERNAL_ERROR'));
            console.error(e);
        })
}
