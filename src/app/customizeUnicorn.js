import dbUtil from "./dbUtils.js";
import httpUtil from "./httpUtil.js";
// var permissions = require("./permissions.js");

export async function lambda_handler(event, context) {
    console.log("received input event: \n" + JSON.stringify(event, null, 2));

    let id = (event.pathParameters || {}).id || false;

    if (id) {
        id = decodeURI(id);
        var resource = id;
    }

    var company;

    // use the copmany id from auth context
    if ("authorizer" in event["requestContext"] && "CompanyID" in event["requestContext"]["authorizer"]) {
        company = event["requestContext"]["authorizer"]["CompanyID"];
    }
    
    var principalId = event["requestContext"]["authorizer"]["principalId"];
    var action = event["requestContext"]["resourcePath"];
    var httpMethod = event["requestContext"]["httpMethod"];
    

    if (event.httpMethod === "GET") {
        // individual customization
        if (id) {
            try {
                // const isAllowed = await permissions.isAuthorized(principalId, action, httpMethod, resource)
                // if (isAllowed) {
                    const unicornData = await dbUtil.getCustomUnicorn(id, company);
                    
                    
                    console.log("successfully retrieved: " + JSON.stringify(unicornData, null, 2));
            
                    if (unicornData.length == 0) {
                        return httpUtil.returnNotFound("Unicorn customization " + id + " does not exist.");
                    }
                    else {
                        var resultRow = unicornData[0];
            
                        if (company !== undefined) {
                            delete resultRow["COMPANY"];
                            return httpUtil.returnOK(resultRow);
                        } else {
                            return httpUtil.returnOK(resultRow);
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
                return httpUtil.returnFail("Error retrieving unicorn customization");
            }
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
                var results = await dbUtil.listCustomUnicorn(company);

                console.log("successfully retrieved " + results.length + " custom unicorns.");

                results = results.map(item => {
                    delete item["COMPANY"];
                    return item;
                });
                return httpUtil.returnOK(results);
                
            } catch(e){
                console.error(e);
                return httpUtil.returnFail("Error retrieving unicorn customizations");
            }
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
            return httpUtil.returnBadInput("Company not valid");
        }
        
        const imageUrl = request['imageUrl'];
        const sock = request['sock'];
        const horn = request['horn'];
        const glasses = request['glasses'];
        const cape = request['cape'];
        try {
            const db_results = await dbUtil.createCustomUnicorn(name, company, imageUrl, sock, horn, glasses, cape);
            console.log("successfully inserted custom unicorn.");

            // create an AVP policy
            // console.log("creating AVP policy for the unicorn.");
            // await permissions.createTemplateLinkedPolicy(principalId, db_results['customUnicornId'])

            return httpUtil.returnOK(db_results);
        }
        catch(e) {
            console.error(e);
            return httpUtil.returnFail("Error creating unicorn");
        }
    // delete unicorn customization
    } else if (event.httpMethod === "DELETE") {
        try {
            // check if allowed to delete
            // const isAllowed = await permissions.isAuthorized(principalId, action, httpMethod, resource)
            // if (isAllowed) {
                const results = await dbUtil.deleteCustomUnicorn(id, company);
        
                console.log("successfully deleted custom unicorn " + results);
                // await permissions.deletePolicy(principalId, resource)
                return httpUtil.returnOK(results);
            // }
            // else {
            //     callback(null, httpUtil.returnFail("Unauthorized"));
            //     return;
            // }
        } catch(e) {
            console.error(e);
            return httpUtil.returnFail("Error deleting unicorn customization");
        }
    } else {
        console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
        return {statusCode: 501};
    }
};     

