import mysql from 'mysql';

const CUSTOM_UNICORN_TABLE = "Custom_Unicorns";
const PARTNER_COMPANY_TABLE = "Companies";

/*
* Host
*/

const host = "secure-aurora-cluster.cluster-xxxxxxx.xxxxxxx.rds.amazonaws.com"

class Database {
    query(sql, connection, args) {
        return new Promise((resolve, reject) => {
            connection.query(sql, args, (errorQuerying, rows) => {
                connection.end(errClosing => {
                    if (errClosing) {
                        console.log("error closing connection");
                        console.error(errClosing);
                    }
                    if (errorQuerying) {
                        return reject(errorQuerying);
                    }
                    resolve(rows);
                });
            });
        });
    }

    close(connection) {
        return new Promise((resolve, reject) => {
            connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }

    connectToDb(dbConfig) {
        return new Promise((resolve, reject) => {
            resolve(mysql.createConnection(dbConfig));
        });
    };

    getDbConfig() {
        console.log("getDbConfig()");
        return new Promise((resolve, reject) => {
            resolve({
                host: host,
                user: "admin",
                password: "Corp123!",
                database: "unicorn_customization",
                multipleStatements: true
            });
        });
    };
}

function executeDBquery(query) {
    const dbConn = new Database();
    return dbConn.getDbConfig()
        .then(dbConn.connectToDb)
        .then(dbConn.query.bind(this, query));
}

export const databaseFunctions = {
    countBodyPartOptions: async function (bodyPart) {
        const query = `SELECT count(*) FROM ${bodyPart}`;
        console.log("query for DB: " + query);
        const results = await executeDBquery(query);
        console.log(JSON.stringify(results));
        let count = results[0]["count(*)"];
        console.log(bodyPart + " count: " + count);
        return [bodyPart, count];
    },

    listBodyPartOptions: async function (bodyPart) {
        const query = `SELECT * FROM ${bodyPart}`;
        console.log("query for DB: " + query);
        return await executeDBquery(query);
    },

    addPartnerCompany: async function (companyName) {
        const insertQuery = `INSERT INTO ${PARTNER_COMPANY_TABLE} (NAME) VALUES ('${companyName}')`;
        console.log("query for insert:" + insertQuery);
        const results = await executeDBquery(insertQuery);
        console.log(JSON.stringify(results, null, 2));
        let insertId = results.insertId;
        console.log("insert id: " + insertId);
        return { "companyId": insertId };
    },

    createCustomUnicorn: async function (name, company, imageUrl, sock, horn, glasses, cape) {
        const dbConn = new Database();
        const insertQuery = `INSERT INTO ${CUSTOM_UNICORN_TABLE} (NAME, COMPANY, IMAGEURL, SOCK, HORN, GLASSES, CAPE) VALUES ('${name}',${company},'${imageUrl}',${sock},${horn},${glasses},${cape})`;
        console.log("query for insert:" + insertQuery);
        const results = await dbConn.getDbConfig()
            .then(dbConn.connectToDb)
            .then(dbConn.query.bind(this, insertQuery));
        console.log(JSON.stringify(results, null, 2));
        let insertId = results.insertId;
        if (insertId === undefined)
        {
            insertId = results[0].insertId;
        }
        console.log("insert id: " + insertId);
        return { "customUnicornId": insertId };
    },

    listCustomUnicorn: async function (company, unicornIds = []) {
        let query = `SELECT * FROM ${CUSTOM_UNICORN_TABLE}`;
        console.log("query for compa" + company)
        if (company !== null && company !== undefined && company !== "") {
            query += ` WHERE COMPANY = ${company}`;
        }
        //if (unicornIds.length > 0) {
        //    query += " AND ID IN (" + unicornIds.join(",") + ")";
        //}
        console.log("query for DB: " + query);
        return await executeDBquery(query);
    },

    getCustomUnicorn: async function (id, company) {
        let query = `SELECT * FROM ${CUSTOM_UNICORN_TABLE} WHERE ID = ${id}`;
        if (company !== null && company !== undefined && company !== "") {
            query += ` AND COMPANY = ${company}`;
        }
        console.log("query for DB: " + query);
        return await executeDBquery(query);
    },

    deleteCustomUnicorn: async function (id, company) {
        let query = `DELETE FROM ${CUSTOM_UNICORN_TABLE} WHERE ID = ${id}`;
        if (company !== null && company !== undefined && company !== "") {
            query += ` AND COMPANY = ${company}`;
        }
        console.log("query for DB: " + query);
        const results = await executeDBquery(query);
        if (results.affectedRows == 1) {
            return { "id": id };
        } else {
            return {};
        }
    }
}

export default databaseFunctions;
