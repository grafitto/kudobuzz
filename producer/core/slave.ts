import { IMessage } from "../types";
import amqp from 'amqplib/callback_api';
export class Slave {

    private readonly amqpUrl: string;
    private readonly queue: string;

    constructor(url: string, queue: string) {
        this.amqpUrl = url;
        this.queue = queue;
    }

    public async send(message: IMessage): Promise<any> {
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