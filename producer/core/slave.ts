import { IMessage } from "../types";
import amqp from 'amqplib/callback_api';
import { Validator } from './validator';

export class Slave {

    private readonly amqpUrl: string;
    private readonly queue: string;
    private readonly validator: Validator;

    constructor(url: string, queue: string, validator: Validator) {
        this.amqpUrl = url;
        this.queue = queue;
        this.validator = validator;
    }

    public async send(message: IMessage): Promise<any> {
        this.validator.ValidateMessage(message);
        //Push the request to the rabbitMQ queue
        return new Promise<any>((resolve, reject) => {
            amqp.connect(this.amqpUrl, (err: any, connection: amqp.Connection) => {
                if(err) {
                    reject(err);
                } else {
                    connection.createChannel((err: any, channel: amqp.Channel) => {
                        if(err) {
                            reject(err);
                        } else {
                            channel.assertQueue(this.queue, { durable: false });
                            channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
                        }
                    });
                    setTimeout(() => {
                        connection.close();
                        resolve();
                    }, 500);
                }
            });
        });
    }
}