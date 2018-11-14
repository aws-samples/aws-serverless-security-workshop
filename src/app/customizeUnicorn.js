var dbUtil = require("./dbUtils.js");
var httpUtil = require("./httpUtil.js");


exports.lambda_handler = function (event, context, callback) {
    console.log("received input event: \n" + JSON.stringify(event, null, 2));

    let id = (event.pathParameters || {}).id || false;

    if (id) {
        id = decodeURI(id)
    }

    var company;

    // use the copmany id from auth context
    if ("authorizer" in event["requestContext"] && "CompanyID" in event["requestContext"]["authorizer"]) {
        company = event["requestContext"]["authorizer"]["CompanyID"];

    }

    if (event.httpMethod === "GET") {
        // individual customization
        if (id) {
            dbUtil.getCustomUnicorn(id, company).then(results => {
                console.log("successfully retrieved: " + JSON.stringify(results, null, 2));

                if (results.length == 0) {
                    callback(null, httpUtil.returnNotFound("Unicorn customization " + id + " does not exist."));
                    return;
                }
                else {
                    var resultRow = results[0];

                    if (company !== undefined) {
                        delete resultRow["COMPANY"]
                        callback(null, httpUtil.returnOK(resultRow));
                        return;
                    } else {
                        callback(null, httpUtil.returnOK(resultRow));
                        return;
                    }
                }
            }).catch(e => {
                console.error(e);
                callback(null, httpUtil.returnFail("Error querying"));
                return;
            });
        }
        // LIST request
        else {
            dbUtil.listCustomUnicorn(company).then(results => {
                console.log("successfully retrieved " + results.length + " custom unicorns.");

                results = results.map(item => {
                    delete item["COMPANY"];
                    return item
                });
                callback(null, httpUtil.returnOK(results));
                return;
            }).catch(e => {
                console.error(e);
                callback(null, httpUtil.returnFail("Error querying"));
                return;
            });
        }
    } else if (event.httpMethod === "POST") {
        const request = JSON.parse(event["body"]);

        if ("company" in request) {
            company = request['company'];
        }

        const name = request['name'];


        if (company === undefined) {
            console.log("no company specified");
            callback(null, httpUtil.returnBadInput("Company not valid"));
            return;
        }

        const imageUrl = request['imageUrl'];
        const sock = request['sock'];
        const horn = request['horn'];
        const glasses = request['glasses'];
        const cape = request['cape'];

        dbUtil.createCustomUnicorn(name, company, imageUrl, sock, horn, glasses, cape).then(results => {
            console.log("successfully inserted custom unicorn.");
            callback(null, httpUtil.returnOK(results));
            return;
        }).catch(e => {
            console.error(e);
            callback(null, httpUtil.returnFail("Error querying"));
            return;
        });

    } else if (event.httpMethod === "DELETE") {
        dbUtil.deleteCustomUnicorn(id, company).then(results => {
            console.log("successfully deleted custom unicorn " + results);
            callback(null, httpUtil.returnOK(results));
            return;
        }).catch(e => {
            console.error(e);
            callback(null, httpUtil.returnFail("Error querying"));
            return;
        });
    } else {
        console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
        callback(null, {statusCode: 501});

    }

};
