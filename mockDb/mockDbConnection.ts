

/**
 * Import npm module
 */

const config = require('../config.json');
const MongoClient = require('mongodb').MongoClient;
let locator = new Map();

export class MockDbConnect {

    public static dbConnect(): Promise<boolean> {

        return new Promise((resolve, reject) => {
            //map config json file in locator
            locator.set('config', config);
            //
            if (!global['locator'] || !global['locator'].db) {
                MongoClient.connect(config.dbConnectionUrl + config.unitTestDbName, (error, db) => {
                    if (error) {
                        console.log('Database connection error occur!', JSON.stringify(error));
                        reject(error);
                    }
                    else {
                        locator.set('db', db);
                        global['locator'] = locator;
                        console.log('Database connectioned !');
                        resolve(true);
                    }
                });
            } else {
                resolve(true);
            }
        });
    }
    /** */
    public static dropTestCollection(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            let db = global['locator'].get('db');
            let collection = db.collection('TWEETS');
            collection.drop((error, result) => {
                console.log('Database collection droped  !', global['locator'].get('config').unitTestDbName);
                resolve(result);
            });
        });
    }
}


