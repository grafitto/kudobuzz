import amqp, { Message } from 'amqplib/callback_api';
import mongoose from 'mongoose';
import { Aggregator, Validator } from './core/controllers';

const settings = {
    amqpUrl: process.env.AMQP_QUEUE || 'amqp://localhost',
    queue: process.env.AMQP_QUEUE || 'kb-new-review-topic',
    mongoUrl: process.env.SLAVE_MONGODB_URL || 'mongodb://localhost:27017/',
    dbPrefix: process.env.SLAVE_MONGODB_PREFIX || 'kudobuzz_',
    dbName: process.env.SLAVE_MONGODB_NAME || 'reviews'
}

//Connect to the DB
mongoose.connect(settings.mongoUrl + settings.dbPrefix + settings.dbName, { useNewUrlParser: true });

//Power up the aggregator
const aggregator: Aggregator = new Aggregator(new Validator());

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
                            channel.ack(msg);
                        }).catch((err: any) => {
                            channel.nack(msg);
                        });
                    }
                });
            }
        });
    }
});