"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var callback_api_1 = __importDefault(require("amqplib/callback_api"));
var settings = {
    amqpUrl: process.env.AMQP_QUEUE || 'amqp://localhost',
    port: process.env.SLAVE_PORT || 3001,
    queue: process.env.AMQP_QUEUE || 'kb-new-review-topic'
};
callback_api_1.default.connect(settings.amqpUrl, function (err, connection) {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
    else {
        connection.createChannel(function (err, channel) {
            if (err) {
                console.error(err.message);
                process.exit(1);
            }
            else {
                channel.consume(settings.queue, function (msg) {
                    if (msg) {
                        console.log(JSON.parse(msg.content.toString()));
                        channel.ack(msg);
                    }
                });
            }
        });
    }
});
