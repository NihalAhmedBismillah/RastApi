"use strict";
/**
 * Import npm module
 */
Object.defineProperty(exports, "__esModule", { value: true });
var config = require('../config.json');
var MongoClient = require('mongodb').MongoClient;
var locator = new Map();
var DbConnect = /** @class */ (function () {
    function DbConnect() {
    }
    /**
     *
    */
    DbConnect.dbConnect = function () {
        return new Promise(function (resolve, reject) {
            //map config json file in locator
            locator.set('config', config);
            //
            if (!global['locator'] || !global['locator'].db) {
                MongoClient.connect(config.dbConnectionUrl + config.dbName, function (error, db) {
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
            }
            else {
                resolve(true);
            }
        });
    };
    return DbConnect;
}());
exports.DbConnect = DbConnect;
