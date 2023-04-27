"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var App = /** @class */ (function () {
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
    }
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    App.prototype.routes = function () {
        var router = express.Router();
        router.get('/forumposts', function (req, res) {
            //console.log("Hello, you've reached list of posts successfully");
            res.send("/forumposts works correctly");
        });
        router.get('/forumposts/:id', function (req, res) {
            //console.log("Hello, you've reached get post successfully");
            var id = req.params.id;
            res.json({ "id": id });
        });
        router.post('/forumposts', function (req, res) {
            //console.log("Hello, you've reached POST post successfully");
            res.send("/forumposts works correctly");
        });
        router.put('/forumposts/:id', function (req, res) {
            //console.log("Hello, you've reached list of posts successfully");
            res.send("/forumposts/:id works correctly");
        });
        router.delete('/forumposts/:id', function (req, res) {
            //console.log("Hello, you've reached list of posts successfully");
            res.send("/forumposts/:id works correctly");
        });
        this.expressApp.use('/', router);
    };
    return App;
}());
exports.App = App;
