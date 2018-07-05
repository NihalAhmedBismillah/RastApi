"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clsTweet_1 = require("../../lib/clsTweet");
var TweetController = /** @class */ (function () {
    function TweetController() {
    }
    TweetController.init = function (app) {
        return new Promise(function (resolve, reject) {
            app.post('/api/v1/tweet', function (req, res) {
                var tweet = req.body;
                clsTweet_1.ClsTweet.addTweet(tweet).then(function (data) {
                    res.json(data);
                }).catch(function (error) {
                    var resp = {
                        message: error,
                        detail: 'data not saved'
                    };
                    res.json(resp);
                });
            });
            app.get('/api/v1/tweet/:id', function (req, res) {
                var id = req.params.id;
                console.log('id : ', id);
                clsTweet_1.ClsTweet.getTweet(id).then(function (data) {
                    res.json(data);
                }).catch(function (error) {
                    var resp = {
                        message: error,
                        detail: 'data not get'
                    };
                    res.json(resp);
                });
            });
            app.get('/api/v1/tweet', function (req, res) {
                console.log(req.query);
                var pageNo = parseInt(req.query.page, 10) || 1;
                var pageSize = parseInt(req.query.pagesize, 10) || 5;
                var id = req.params.id;
                console.log('pageNo : ', pageNo);
                console.log('pageSize : ', pageSize);
                clsTweet_1.ClsTweet.getTweetList(pageNo, pageSize).then(function (data) {
                    console.log('result : ', data);
                    res.json(data);
                }).catch(function (error) {
                    var resp = {
                        message: error,
                        detail: 'data not get'
                    };
                    res.json(resp);
                });
            });
            app.put('/api/v1/tweet/:id', function (req, res) {
                var bodyData = req.body;
                var id = req.params.id;
                //TODO: Save data in database.
                res.send(bodyData);
            });
            app.delete('/api/v1/tweet/:id', function (req, res) {
                //TODO:Delete data from database
                var id = req.params.id;
                res.json({ id: id, message: 'record deleted' });
            });
            app.get('/', function (req, res) {
                res.send('server started on post 3001');
            });
            resolve();
        });
    };
    return TweetController;
}());
exports.TweetController = TweetController;
