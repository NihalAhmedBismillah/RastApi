"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var tweet_controller_1 = require("./apps/controllers/tweet.controller");
var dbConnect_1 = require("./lib/dbConnect");
var bodyParser = require('body-parser'), logger = require('morgan'), methodOverride = require('method-override');
exports.app = express();
var middleWare = /** @class */ (function () {
    function middleWare() {
    }
    middleWare.init = function (app) {
        return new Promise(function (res, rej) {
            app.use(logger('dev'));
            app.set('view engine', 'ejs');
            app.use(logger('dev'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(methodOverride('_method'));
            res();
        });
    };
    return middleWare;
}());
var AppSetUp = /** @class */ (function () {
    function AppSetUp() {
    }
    AppSetUp.init = function () {
        return new Promise(function (res, rej) {
            //let app = express();
            middleWare.init(exports.app).then(function () {
                return tweet_controller_1.TweetController.init(exports.app);
            })
                .then(function () {
                return dbConnect_1.DbConnect.dbConnect();
            })
                .then(function () {
                var PORT = global['locator'].get('config').PORT || 3001;
                exports.app.listen(PORT);
                res(true);
            }).
                catch(function (error) {
                rej(error);
            });
        });
    };
    return AppSetUp;
}());
exports.AppSetUp = AppSetUp;
