const { validationResult } = require("express-validator")
const methods = require("../../helpers/methods")
const validationFailCode = parseInt(process.env.VALIDATION_FAIL_CODE)
/**
 * sequential processing, stops running validations chain if the previous one have failed.
 */
exports.validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req)
            if (result.errors.length) break
        }

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        const error = errors.array()[0];
        res.status(validationFailCode).json(
            methods.failResponse(error.msg, error)
        )
    }
}
