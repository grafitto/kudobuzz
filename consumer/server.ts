import amqp, { Message } from 'amqplib/callback_api';
import mongoose from 'mongoose';
import { Aggregator } from './core';

const settings = {
    amqpUrl: process.env.AMQP_QUEUE || 'amqp://localhost',
    queue: process.env.AMQP_QUEUE || 'kb-new-review-topic',
    mongoUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/',
    dbPrefix: process.env.MONGODB_PREFIX || 'kudobuzz_',
    dbName: process.env.MONGODB_NAME || 'aggregates'
}

//Connect to the DB
mongoose.connect(settings.mongoUrl + settings.dbPrefix + settings.dbName, { useNewUrlParser: true });

//Power up the aggregator
const aggregator: Aggregator = new Aggregator();

amqp.connect(settings.amqpUrl, (err:any, connection: amqp.Connection) => {
    if(err) {
        console.error(err.message);
        process.exit(1);
    } else {
        connection.createChannel((err: any, channel: amqp.Channel) => {
            if(err) {
                console.error(err.message);
                process.exit(1);
            } else {
                channel.consume(settings.queue, (msg: Message | null) => {
                    if(msg) {
                        aggregator.handle(JSON.parse(msg.content.toString())).then((res: any) => {
                            console.log('Message consumed successfully!');
                            channel.ack(msg);
                        }).catch((err: any) => {
                            console.error(err.message);
                            channel.nack(msg);
                        });
                    }
                });
            }
        });
    }
});