module.exports.returnFail = function (message) {
    return {
        statusCode: 500,
        body: JSON.stringify(message)
    }
}


module.exports.returnBadInput = function (message) {
    return {
        statusCode: 400,
        body: JSON.stringify(message)
    }
}

module.exports.returnNotFound = function (message) {
    return {
        statusCode: 404,
        body: JSON.stringify(message)
    }
}

module.exports.returnAccessDenied = function (message) {
    return {
        statusCode: 403,
        body: JSON.stringify(message)
    }
}


module.exports.returnOK = function (message) {
    return {
        statusCode: 200,
        body: JSON.stringify(message)
    }
}
