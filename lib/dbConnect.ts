
/**
 * Import npm module
 */

const config = require('../config.json');
const MongoClient = require('mongodb').MongoClient;
let locator = new Map();

export class DbConnect {

    /** 
     * 
    */
    public static dbConnect(): Promise<boolean> {

        return new Promise((resolve, reject) => {
            //map config json file in locator
            locator.set('config', config);
            //
            if (!global['locator'] || !global['locator'].db) {
                MongoClient.connect(config.dbConnectionUrl + config.dbName, (error, db) => {
                    if (error) {
                        console.log('Database connection error occur!', JSON.stringify(error));
                        reject(error);
                    }
                    else {
                        locator.set('db', db);
                        // assign locator in global variable
                        global['locator'] = locator;
                        console.log('Database connectioned!');
                        resolve(true);
                    }
                });
            } else {
                resolve(true);
            }
        });
    }
}


