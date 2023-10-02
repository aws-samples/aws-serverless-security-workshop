var dbUtil = require("./dbUtils.js");
var httpUtil = require("./httpUtil.js");
// var permissions = require("./permissions.js");

exports.lambda_handler = async function (event, context, callback) {
    console.log("received input event: \n" + JSON.stringify(event, null, 2));

    let id = (event.pathParameters || {}).id || false;

    if (id) {
        id = decodeURI(id)
        var resource = id
    }

    var company;

    // use the copmany id from auth context
    if ("authorizer" in event["requestContext"] && "CompanyID" in event["requestContext"]["authorizer"]) {
        company = event["requestContext"]["authorizer"]["CompanyID"];
    }
    
    var principalId = event["requestContext"]["authorizer"]["principalId"]
    var action = event["requestContext"]["resourcePath"]
    var httpMethod = event["requestContext"]["httpMethod"]
    

    if (event.httpMethod === "GET") {
        // individual customization
        if (id) {
            try {
                // const isAllowed = await permissions.isAuthorized(principalId, action, httpMethod, resource)
                // if (isAllowed) {
                    const unicornData = await dbUtil.getCustomUnicorn(id, company)
                    
                    
                    console.log("successfully retrieved: " + JSON.stringify(unicornData, null, 2));
            
                    if (unicornData.length == 0) {
                        callback(null, httpUtil.returnNotFound("Unicorn customization " + id + " does not exist."));
                        return;
                    }
                    else {
                        var resultRow = unicornData[0];
            
                        if (company !== undefined) {
                            delete resultRow["COMPANY"]
                            callback(null, httpUtil.returnOK(resultRow));
                            return;
                        } else {
                            callback(null, httpUtil.returnOK(resultRow));
                            return;
                        }
                    }
                // } //permissions.isAuthorized
                // else {
                //     callback(null, httpUtil.returnFail("Unauthorized"));
                //     return;
                // }
            }
            catch(e){
                console.error(e);
                callback(null, httpUtil.returnFail("Error retrieving unicorn customization"));
                return;
            };
        }
        // LIST request
        else {
            
            try {
                // console.log("Listing AVP policies to get unicornIds for this partner");
                // const policies = await permissions.listPolicies(principalId)
                // var unicornIds = []
                
                // if ('policies' in policies && policies['policies'].length > 0) {
                //     policies['policies'].forEach((policy) => unicornIds.push(policy['resource']['entityId']));
                // }
                
                // var results = await dbUtil.listCustomUnicorn(company, unicornIds)
                var results = await dbUtil.listCustomUnicorn(company)

                console.log("successfully retrieved " + results.length + " custom unicorns.");

                results = results.map(item => {
                    delete item["COMPANY"];
                    return item
                });
                callback(null, httpUtil.returnOK(results));
                return;
                
            } catch(e){
                console.error(e);
                callback(null, httpUtil.returnFail("Error retrieving unicorn customizations"));
                return;
            };
        }
    // create unicorn customization
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
        try {
            const db_results = await dbUtil.createCustomUnicorn(name, company, imageUrl, sock, horn, glasses, cape)
            console.log("successfully inserted custom unicorn.");

            // create an AVP policy
            // console.log("creating AVP policy for the unicorn.");
            // await permissions.createTemplateLinkedPolicy(principalId, db_results['customUnicornId'])

            callback(null, httpUtil.returnOK(db_results));
        }
        catch(e) {
            console.error(e);
            callback(null, httpUtil.returnFail("Error creating unicorn"));
            return;
        };
    // delete unicorn customization
    } else if (event.httpMethod === "DELETE") {
        try {
            // check if allowed to delete
            // const isAllowed = await permissions.isAuthorized(principalId, action, httpMethod, resource)
            // if (isAllowed) {
                const results = await dbUtil.deleteCustomUnicorn(id, company)
        
                console.log("successfully deleted custom unicorn " + results);
                // await permissions.deletePolicy(principalId, resource)
                callback(null, httpUtil.returnOK(results));
                return;
            // }
            // else {
            //     callback(null, httpUtil.returnFail("Unauthorized"));
            //     return;
            // }
        } catch(e) {
            console.error(e);
            callback(null, httpUtil.returnFail("Error deleting unicorn customization"));
            return;
        };
    } else {
        console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
        callback(null, {statusCode: 501});
    }

}        

