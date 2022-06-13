const jwt = require('jsonwebtoken');
const methods = require('../helpers/methods')
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
module.exports = (req, res, next) => {
    try {
        if (!req.cookies.access_token) throw 'Unauthorized';
        req.user = jwt.verify(req.cookies.access_token, process.env.SECRET);
        next();
    } catch (err) {
        return res.status(401).json(methods.failResponse(err));
    }
}