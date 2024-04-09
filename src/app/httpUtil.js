export const returnFail = (message) => {
    return {
        statusCode: 500,
        body: JSON.stringify(message)
    };
};

export const returnBadInput = (message) => {
    return {
        statusCode: 400,
        body: JSON.stringify(message)
    };
};

export const returnNotFound = (message) => {
    return {
        statusCode: 404,
        body: JSON.stringify(message)
    };
};

export const returnAccessDenied = (message) => {
    return {
        statusCode: 403,
        body: JSON.stringify(message)
    };
};

export const returnOK = (message) => {
    return {
        statusCode: 200,
        body: JSON.stringify(message)
    };
};

const exportObject = {
    returnFail,
    returnBadInput,
    returnNotFound,
    returnAccessDenied,
    returnOK
};

export default exportObject;