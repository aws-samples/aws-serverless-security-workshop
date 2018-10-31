const dbUtil = require("./dbUtils.js");
const httpUtil = require("./httpUtil.js");

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const SCOPES = ['WildRydes/CustomizeUnicorn']
const companyDDBTable = process.env["PARTNER_DDB_TABLE"];
const ddbDocClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION
});

exports.lambda_handler = function (event, context, callback) {
    console.log("received input event: \n" + JSON.stringify(event, null, 2));

    let id = (event.pathParameters || {}).id || false;


    if (!("authorizer" in event["requestContext"])) {
        console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
        callback(null, httpUtil.returnAccessDenied("You must implement the custom authorizers before you can call this API."));
        return;
    }


    if (event.httpMethod === "POST") {

        const request = JSON.parse(event["body"]);
        const company = request["name"];

        var companyId;
        var clientId;
        var clientSecret;

        dbUtil.addPartnerCompany(company).then(results => {
            console.log("successfully added partner company.");
            // callback(null, httpUtil.returnOK(results));
            // return;
            companyId = results["companyId"]
            return;
        }).then(() => {
            const createUserPoolClientParams = {
                ClientName: company,
                UserPoolId: process.env["USER_POOL_ID"],
                GenerateSecret: true,
                RefreshTokenValidity: 1,
                AllowedOAuthFlows: ['client_credentials'],
                AllowedOAuthScopes: SCOPES,
                AllowedOAuthFlowsUserPoolClient: true
            }
            return cognito.createUserPoolClient(createUserPoolClientParams).promise()
        }).then((createUserPoolClientResponse) => {
            clientId = createUserPoolClientResponse["UserPoolClient"]["ClientId"];
            clientSecret = createUserPoolClientResponse["UserPoolClient"]["ClientSecret"];
            console.log("successfully created cognito client: " + clientId)
            return;
        }).then(() => {
            const putItemParam = {
                TableName: companyDDBTable,
                Item: {
                    'ClientID': clientId,
                    'CompanyID': companyId
                }
            }
            return ddbDocClient.put(putItemParam).promise()
        }).then(() => {
            console.log("success writing to ddb ID mapping");
            return;
        }).then(() => {
            console.log("finished registering partner");
            let returnMessage = {"ClientID": clientId, "ClientSecret": clientSecret}
            callback(null, httpUtil.returnOK(returnMessage))
        }).catch(e => {

            console.error(e);
            console.log("error code: " + e.code);
            if (e.code === "ER_DUP_ENTRY") {
                callback(null, httpUtil.returnBadInput("Company already registered"));
            } else {
                callback(null, httpUtil.returnFail("Error Encountered"));
            }
        })

    } else {
        console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
        callback(null, {statusCode: 501});

    }

};
