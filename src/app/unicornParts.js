import dbUtil from "./dbUtils.js";
import httpUtil from "./httpUtil.js";

export const lambda_handler = async (event) => {
    
    //console.log("received input event: \n" + JSON.stringify(event, null, 2));
    
    if (event['httpMethod'] == 'GET') {

        var bodyPartToQuery = null;

        switch (event["resource"]) {
            case "/horns":
                bodyPartToQuery = "Horns";
                break;
            case "/socks":
                bodyPartToQuery = "Socks";
                break;
            case "/glasses":
                bodyPartToQuery = "Glasses";
                break;
            case "/capes":
                bodyPartToQuery = "Capes";
                break;
        }
        console.log("body part to query: " + bodyPartToQuery);

        if (bodyPartToQuery === null) {
            let response = {
                statusCode: 400,
                body: "Unsupported body part"
            };
            return response;
        }


        var horns = await dbUtil.listBodyPartOptions(bodyPartToQuery);
        console.log("successfully retrieved " + horns.length + " records.");

        let response = {
            statusCode: 200,
            body: JSON.stringify(horns)
        };
        console.log(response);
        return response;

    } else {
        let response = {
            statusCode: 400,
            body: "Unsupported method"
        };
        return response;
    }
};
