"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
exports.Reviews = express_1.Router();
exports.Reviews.post('/reviews', function (req, res) {
    //Receive reviews from different places, sends them to the slave
    req.slave.send(req.body).then(function (response) {
        res.send({ success: true });
    }).catch(function (error) {
        res.status(406).end(error.message);
    });
});
