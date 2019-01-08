"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var callback_api_1 = __importDefault(require("amqplib/callback_api"));
var mongoose_1 = __importDefault(require("mongoose"));
var controllers_1 = require("./core/controllers");
var settings = {
    amqpUrl: process.env.AMQP_QUEUE || 'amqp://localhost',
    queue: process.env.AMQP_QUEUE || 'kb-new-review-topic',
    mongoUrl: process.env.SLAVE_MONGODB_URL || 'mongodb://localhost:27017/',
    dbPrefix: process.env.SLAVE_MONGODB_PREFIX || 'kudobuzz_',
    dbName: process.env.SLAVE_MONGODB_NAME || 'aggregates'
};
//Connect to the DB
mongoose_1.default.connect(settings.mongoUrl + settings.dbPrefix + settings.dbName, { useNewUrlParser: true });
//Power up the aggregator
var aggregator = new controllers_1.Aggregator();
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
                        aggregator.handle(JSON.parse(msg.content.toString())).then(function (res) {
                            console.log('Message consumed successfully!');
                            channel.ack(msg);
                        }).catch(function (err) {
                            console.error(err.message);
                            channel.nack(msg);
                        });
                    }
                });
            }
        });
    }
});
