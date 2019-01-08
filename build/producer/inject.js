"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slave_1 = require("./core/slave");
var validator_1 = require("./core/validator");
function injectSlave(req, res, next) {
    var slave = new slave_1.Slave(process.env.MASTER_RABBITMQ_ENDOINT || 'amqp://localhost', process.env.AMQP_QUEUE || 'kb-new-review-topic', new validator_1.Validator());
    req.slave = slave;
    next();
}
exports.injectSlave = injectSlave;
