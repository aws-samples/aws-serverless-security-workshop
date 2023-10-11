const AWS = require('aws-sdk');
const dbUtil = require("./dbUtils.js");
const httpUtil = require("./httpUtil.js");
const demandForecastDDBTable = process.env["DEMAND_FORECAST_DDB_TABLE"];

const ddbDocClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION
});


exports.lambda_handler = async(event) => {
    try {
        const hornCount = await dbUtil.countBodyPartOptions("Horns");
        const sockCount = await dbUtil.countBodyPartOptions("Socks");
        const glassCount = await dbUtil.countBodyPartOptions("Glasses");
        const capeCount = await dbUtil.countBodyPartOptions("Capes");
        const recordTimeStamp = new Date().toISOString();
        
        console.info(" hornCount:["+ JSON.stringify(hornCount)+"] Socks:["+ sockCount+"] Glasses:["+ glassCount+"] Capes:["+ capeCount+"] recordTimeStamp:["+ recordTimeStamp+"]");
        
        const putItemParam = {
                TableName: demandForecastDDBTable,
                Item: {
                    'HornCount': hornCount[1],
                    'SockCount': sockCount[1],
                    'GlassCount': glassCount[1],
                    'CapeCount': capeCount[1],
                    'RecordTimeStamp':  recordTimeStamp
                }
            }
        return ddbDocClient.put(putItemParam).promise()
    }
    catch (e) {
        console.error(e);
        return 500;
    }
};