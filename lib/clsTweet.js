"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clsDb_1 = require("./clsDb");
var shortid = require('shortid'), COLLECTION_NAME = 'TWEETS';
var ClsTweet = /** @class */ (function () {
    function ClsTweet() {
    }
    /**
     *
     * @param tweet
     */
    ClsTweet.addTweet = function (tweet) {
        return new Promise(function (resolve, reject) {
            tweet._id = shortid.generate(), tweet.created_at = new Date(), tweet.updated_at = new Date();
            clsDb_1.DbOperation.save(tweet, COLLECTION_NAME).then(function (data) {
                resolve(data);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     *
     * @param tweetId
     */
    ClsTweet.getTweet = function (tweetId) {
        return new Promise(function (res, rej) {
            clsDb_1.DbOperation.find({ _id: tweetId }, COLLECTION_NAME)
                .then(function (data) {
                res(data);
            })
                .catch(function (error) {
                rej(error);
            });
        });
    };
    /**
     *
     * @param tweetId
     */
    ClsTweet.getTweetList = function (pageNo, pageSize) {
        return new Promise(function (res, rej) {
            clsDb_1.DbOperation.findWithPaginantion(pageNo, pageSize, COLLECTION_NAME)
                .then(function (data) {
                res(data);
            })
                .catch(function (error) {
                rej(error);
            });
        });
    };
    /**
     *
     * @param tweetId
     */
    ClsTweet.deleteTweet = function (tweetId) {
        return new Promise(function (res, rej) {
        });
    };
    /**
     *
     * @param tweetId
     */
    ClsTweet.updateTweet = function (tweetId) {
        return new Promise(function (res, rej) {
        });
    };
    return ClsTweet;
}());
exports.ClsTweet = ClsTweet;
