export const returnFail = (message) => {
    return {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(message)
    };
};

export const returnBadInput = (message) => {
    return {
        statusCode: 400,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(message)
    };
};

export const returnNotFound = (message) => {
    return {
        statusCode: 404,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(message)
    };
};

export const returnAccessDenied = (message) => {
    return {
        statusCode: 403,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(message)
    };
};

export const returnOK = (message) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
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