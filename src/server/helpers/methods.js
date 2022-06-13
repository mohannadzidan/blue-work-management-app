/**
 *
 * @param message
 * @param payload
 * @returns {{package, message, status: boolean}}
 */
exports.successResponse = (payload = undefined) => {
    return {
        status: true,
        message: 'SUCCESS',
        payload: payload
    }
}

/**
 *
 * @param message
 * @param payload
 * @returns {{message, status: boolean}}
 */
exports.failResponse = (message, payload = null) => {
    let response = {
        status: false,
        message: message
    }

    if (payload) {
        response.payload = payload
    }

    return response
}

/**
 *
 * @type {{message: string, status: boolean}}
 */
exports.notFountResponse = {
    status: false,
    message: "Unable to find the requested resource!"
}
