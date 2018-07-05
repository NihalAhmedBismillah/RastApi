"use strict";
/**
 * Import npm packages
 */
Object.defineProperty(exports, "__esModule", { value: true });
var DbOperation = /** @class */ (function () {
    function DbOperation() {
    }
    /**
     *
     * @param data
     * @param collectionName
     */
    DbOperation.save = function (data, collectionName) {
        return new Promise(function (resolve, reject) {
            if (!data || !collectionName)
                return reject('Invalid paramater');
            var db = global['locator'].get('db');
            var collection = db.collection(collectionName);
            collection.save(data, function (error, result) {
                return (!error) ? resolve(result) : reject(error);
            });
        });
    };
    /**
     *
     * @param updateOptions
     * @param collectionName
     */
    DbOperation.updateFields = function (updateOptions, collectionName) {
        return new Promise(function (res, rej) {
            if (!updateOptions || !collectionName)
                return rej('Invalid paramater');
            var db = global['locator'].get('db');
            var collection = db.collection(collectionName);
            collection.update(updateOptions.query, { $set: updateOptions.updateFields }, { upsert: true }, function (error, result) {
                if (!error) {
                    res(result);
                }
                else {
                    rej(error);
                }
            });
        });
    };
    /**
     *
     * @param query
     * @param collectionName
     */
    DbOperation.find = function (query, collectionName) {
        return new Promise(function (res, rej) {
            if (!query || !collectionName)
                return rej('Invalid paramater');
            var db = global['locator'].get('db');
            var collection = db.collection(collectionName);
            collection.find(query).toArray(function (error, result) {
                return (!error) ? res(result) : rej(error);
            });
        });
    };
    /**
     *
     * @param pageNo
     * @param pageSize
     * @param collectionName
     */
    DbOperation.findWithPaginantion = function (pageNo, pageSize, collectionName) {
        return new Promise(function (resolve, reject) {
            if (!collectionName)
                return reject('Invalid paramater');
            var db = global['locator'].get('db');
            var collection = db.collection(collectionName);
            collection.find({}).count(function (error, count) {
                if (!error) {
                    collection.find({})
                        .skip((pageSize * pageNo) - pageSize)
                        .limit(pageSize).toArray(function (error, result) {
                        if (!error) {
                            resolve({ data: result, currentPage: pageNo, totalPages: Math.ceil(count / pageSize) });
                        }
                        else {
                            reject(error);
                        }
                    });
                }
                else {
                    reject(error);
                }
            });
        });
    };
    /**
     *
     * @param query
     * @param collectionName
     */
    DbOperation.remove = function (query, collectionName) {
        return new Promise(function (res, rej) {
            if (!query || !collectionName)
                return rej('Invalid paramater');
            var db = global['locator'].get('db');
            var collection = db.collection(collectionName);
            collection.remove(query, function (error, result) {
                return (!error) ? res(result) : rej(error);
            });
        });
    };
    return DbOperation;
}());
exports.DbOperation = DbOperation;
