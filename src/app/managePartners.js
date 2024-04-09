import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"; // ES Modules import
import { CognitoIdentityProviderClient, CreateUserPoolClientCommand } from "@aws-sdk/client-cognito-identity-provider";
import dbUtil from "./dbUtils.js";
import httpUtil from "./httpUtil.js";

const SCOPES = ['WildRydes/CustomizeUnicorn'];
const companyDDBTable = process.env["PARTNER_DDB_TABLE"];

const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

export const lambda_handler = async (event) => {
    console.log("received input event: \n" + JSON.stringify(event, null, 2));

    let id = (event.pathParameters || {}).id || false;

    if (!("authorizer" in event["requestContext"])) {
        console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
        return httpUtil.returnAccessDenied("You must implement the custom authorizers before you can call this API.");
    }

    if (event.httpMethod === "POST") {
        try {
            const request = JSON.parse(event["body"]);
            const company = request["name"];

            let companyId;
            let clientId;
            let clientSecret;

            const results = await dbUtil.addPartnerCompany(company);
            console.log("successfully added partner company.");
            companyId = results["companyId"];

            const createUserPoolClientParams = {
                ClientName: company,
                UserPoolId: process.env["USER_POOL_ID"],
                GenerateSecret: true,
                RefreshTokenValidity: 1,
                AllowedOAuthFlows: ['client_credentials'],
                AllowedOAuthScopes: SCOPES,
                AllowedOAuthFlowsUserPoolClient: true
            };
            const createUserPoolClientResponse = await cognitoClient.send(new CreateUserPoolClientCommand(createUserPoolClientParams));
            clientId = createUserPoolClientResponse.UserPoolClient.ClientId;
            clientSecret = createUserPoolClientResponse.UserPoolClient.ClientSecret;
            console.log("successfully created cognito client: " + clientId);

            const putItemParam = {
                TableName: companyDDBTable,
                Item: {
                    'ClientID': { S: clientId },
                    'CompanyID': { S: companyId.toString() }
                }
            };
            console.log("DDB params: " + JSON.stringify(putItemParam));
            await ddbClient.send(new PutItemCommand(putItemParam));
            console.log("success writing to ddb ID mapping");

            let returnMessage = { "ClientID": clientId, "ClientSecret": clientSecret };
            return httpUtil.returnOK(returnMessage);
        } catch (e) {
            console.error(e);
            console.log("error code: " + e.code);
            if (e.code === "ER_DUP_ENTRY") {
                return httpUtil.returnBadInput("Company already registered");
            } else {
                return httpUtil.returnFail("Error Encountered");
            }
        }
    } else {
        console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
        return { statusCode: 501 };
    }
};
