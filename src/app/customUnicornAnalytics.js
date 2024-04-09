import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"; // ES Modules import
import dbUtil from "./dbUtils.js";
import httpUtil from "./httpUtil.js";
const demandForecastDDBTable = process.env["DEMAND_FORECAST_DDB_TABLE"];

const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });


export const lambda_handler = async (event) => {
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
            
        return await ddbClient.send(new PutItemCommand(putItemParam));
    }
    catch (e) {
        console.error(e);
        return 500;
    }
};