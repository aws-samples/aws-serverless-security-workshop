var dbUtil = require("./dbUtils.js");
var httpUtil = require("./httpUtil");


exports.lambda_handler = function (event, context, callback) {
    console.log("received input event: \n" + JSON.stringify(event, null, 2));
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
            callback(null, response);
            return;
        }


        dbUtil.listBodyPartOptions(bodyPartToQuery).then(horns => {
            console.log("successfully retrieved " + horns.length + " records.");

            let response = {
                statusCode: 200,
                body: JSON.stringify(horns)
            };
            console.log(response);
            callback(null, response);
        }).catch(e => {
            console.error(e);
            callback(null, httpUtil.returnFail("Error querying"));
        })

    } else {
        let response = {
            statusCode: 400,
            body: "Unsupported method"
        };
        callback(null, response);
        return;
    }
};
